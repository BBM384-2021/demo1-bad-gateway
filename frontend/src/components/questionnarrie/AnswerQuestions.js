import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as questionnarieActions from "../../api/actions/questionnarie";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message} from "semantic-ui-react";



class AnswersQuestions extends Component{

	constructor(props) {
		super(props);
		this.state = {
			userId:0,
			question1: "",
			questions:[],
			answerSelection:[],
			isHidden: true,
			isSuccess: false,
			isError: false,

			messageHeader: "",
			messageForm: "",
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleGetQuestions = this.handleGetQuestions.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.calculateScores = this.calculateScores.bind(this);
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		this.setState({
			...this.state,
			userId:id
		})
		this.props.getQuestions(this.handleGetQuestions);
	}

	handleGetQuestions(data) {
		data.map((question)=> {
			question.selectedAnswer = 0
		})
		this.setState({
				...this.state,
				questions: data,
			}
		)
	}


	handleInputChange(event,data){
		const value = data.value;
		const spaceCharacter = " ";
		const newLineCharacter = "\n";
		if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
			return;
		this.setState({
			[data.id]: value
		})

	}


	submitFormCallback = (error) => {
		console.log("answer form callback")
		console.log(error)
		this.setState({
			isHidden: false,
			messageHeader: "Answers Saved",
			messageForm: error,
			isSuccess: true,
			isError: false,
		})
		setTimeout(() => {
			this.props.history.push("/login");
		},2000)
	};

	submitForm (event){
		event.preventDefault();
		let userScores = this.calculateScores()
		console.log(userScores)
		const data = {
			userId :this.state.userId,
			answerPayloads:userScores
		}
		this.props.answerQuestions(data, this.submitFormCallback);

	}

	calculateScores (){
		let {questions} = this.state
		let answers = []
		let clubId = null
		for(let i = 0 ; i< questions.length ; i++){
			clubId = questions[i].club.id
			if(answers.find(answer => answer.clubId === questions[i].club.id)){
				let tempAnswer = answers.find(answer => answer.clubId === questions[i].club.id)
				let answerChosen = questions[i].answers.find(answer => answer.id === questions[i].selectedAnswer)

				tempAnswer.totalScore = tempAnswer.totalScore + answerChosen.score

			}else{
				let answerChosen = questions[i].answers.find(answer => answer.id === questions[i].selectedAnswer)
				answers.push({
					clubId: questions[i].club.id,
					totalScore: answerChosen.score
				})
			}
		}
		return answers
	}

	handleChange = (questionIndex, answerId) => {
		let dataTemp = [...this.state.questions];
		dataTemp[questionIndex].selectedAnswer=answerId;
		this.setState({
			...this.state,
			questions:dataTemp
		})
	}
	render() {
		const { value } = this.state
		return (
			<Page>
				<Page.Content>
					<Message
						hidden={this.state.isHidden}
						success={this.state.isSuccess}
						error={this.state.isError}
						header={this.state.messageHeader}
						content={this.state.messageForm}
						className={"message-auth"}
					/>
					<Segment  >
						<Header className={"loginHeader"} size={"large"} >Answer Questions</Header>
						<Form onSubmit={this.submitForm}>
							{this.state.questions.map((question,questionIndex)=> {
								return(
									<div >
										<Form.Field style={{paddingBottom:"10px"}}>
											<Form.Input
												label={`Question ${questionIndex+1}`}
												value={question.question}
												readOnly
												id={"question1"}
												onChange={this.handleInputChange}
											/>
										</Form.Field>
										<Form.Group>
										{question.answers.map((answer,index)=> {
											return(
												<Form.Radio
													label={answer.answer}
													value={answer.id}
													checked={question.selectedAnswer === answer.id}
													required
													onChange={() => this.handleChange(questionIndex,answer.id)}
												/>
											)
										})}
										</Form.Group>
									</div>
								)
							})}
							<Button color='violet' type='submit' >Submit</Button>
						</Form>
					</Segment>
				</Page.Content>
			</Page>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getQuestions: (callback) => {
			dispatch(questionnarieActions.getQuestions(callback));
		},
		answerQuestions: (data,callback) => {
			dispatch(questionnarieActions.answerQuestions(data,callback));
		}
	}
};

const mapStateToProps = (state, ownProps) => {
	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswersQuestions))