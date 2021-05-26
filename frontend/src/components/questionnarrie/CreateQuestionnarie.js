import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as questionnarieActions from "../../api/actions/questionnarie";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message} from "semantic-ui-react";



class CreateQuestionnarie extends Component{

	constructor(props) {
		super(props);
		this.state = {
			clubId:0,
			question1: "",
			question2: "",
			question3: "",
			question4: "",

			answers1: [{answer:"",score:25},{answer:"",score:18},{answer:"",score:12},{answer:"",score:5}],
			answers2: [{answer:"",score:25},{answer:"",score:18},{answer:"",score:12},{answer:"",score:5}],
			answers3: [{answer:"",score:25},{answer:"",score:18},{answer:"",score:12},{answer:"",score:5}],
			answers4: [{answer:"",score:25},{answer:"",score:18},{answer:"",score:12},{answer:"",score:5}],

			isHidden: true,
			isSuccess: false,
			isError: false,

			messageHeader: "",
			messageForm: "",
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.updateAnswer = this.updateAnswer.bind(this);
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		this.setState({
			...this.state,
			clubId:id
		})
	}



	handleInputChange(event,data){
		const value = data.value;
		const spaceCharacter = " ";
		const newLineCharacter = "\n";
		if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
			return;
		if(data.id.includes("question")){
			let idInput = data.id.split("-");
			if(idInput.length>1){
				this.updateAnswer(idInput[0],idInput[1],value)

			}else{
				this.setState({
					[data.id]: value
				})
			}
			//console.log(idInput);
		}
	}
	updateAnswer = (question,index, data) => {
		let answersTemp= [];
		switch (question) {
			case 'question1':
				answersTemp = [...this.state.answers1]
				answersTemp[index].answer = data;
				this.setState({
					answers1:answersTemp
				})
			case 'question2':
				answersTemp = [...this.state.answers2]
				answersTemp[index].answer = data;
				this.setState({
					answers2:answersTemp
				})
			case 'question3':
				answersTemp = [...this.state.answers3]
				answersTemp[index].answer = data;
				this.setState({
					answers3:answersTemp
				})
			case 'question4':
				answersTemp = [...this.state.answers4]
				answersTemp[index].answer = data;
				this.setState({
					answers4:answersTemp
				})
		}
	}

	submitFormCallback = (error) => {
		console.log("asd")
		console.log(error)
		this.setState({
			isHidden: false,
			messageHeader: "Questionnarie Created",
			messageForm: error,
			isSuccess: true,
			isError: false,
		})
		setTimeout(() => {
			this.props.history.push("/club/list");
		},2000)
	};

	submitForm (event){
		event.preventDefault();
		const {question1,question2,question3,question4,answers1,answers2,answers3,answers4,clubId} = this.state

		let questionObj = {
			question : question1,
			answers : answers1,
			clubId: clubId
		}
		console.log(questionObj)
		this.props.createQuestionnarie(questionObj, this.submitFormCallback);
		let questionObj2 = {
			question : question2,
			answers : answers2,
			clubId: clubId
		}
		this.props.createQuestionnarie(questionObj2, this.submitFormCallback);
		console.log(questionObj2)
		let questionObj3 = {
			question : question3,
			answers : answers3,
			clubId: clubId
		}
		this.props.createQuestionnarie(questionObj3, this.submitFormCallback);
		console.log(questionObj3)
		let questionObj4 = {
			question : question4,
			answers : answers4,
			clubId: clubId
		}
		this.props.createQuestionnarie(questionObj4, this.submitFormCallback);
		console.log(questionObj4)
	}

	render() {
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
						<Header className={"loginHeader"} size={"large"} >Create Questions</Header>
						<Form onSubmit={this.submitForm}>
							<Form.Field style={{borderBottom:"1px solid black",paddingBottom:"10px"}}>
								<Form.Input
									label={"Question 1"}
									placeholder='Enter your question here.'
									value={this.state.question1}
									required
									id={"question1"}
									onChange={this.handleInputChange}
								/>
								{this.state.answers1.map((answer,index)=> {
									return (
										<div style={{display:"flex",justifyContent:"space-between",marginLeft:"20px"}}>
											<Form.Input
												label={`Answer ${index+1}`}
												placeholder='Enter answer here.'
												value={this.state.answers1[index].question}
												required
												id={`question1-${index}`}
												onChange={this.handleInputChange}
												width={13}
											/>
											<Form.Input
												label={`Point for answer ${index+1}`}
												placeholder='Enter point here.'
												type={"number"}
												value={this.state.answers1[index].score}
												readOnly
												id={`question1-point${index}`}
												width={2}
											/>
										</div>

									)

								})}
							</Form.Field>
							<Form.Field>
								<Form.Input
									label={"Question 2"}
									placeholder='Enter your question here.'
									value={this.state.question2}
									required
									id={"question2"}
									onChange={this.handleInputChange}
								/>
								{this.state.answers2.map((answer,index)=> {
									return (
										<div style={{display:"flex",justifyContent:"space-between",marginLeft:"20px"}}>
											<Form.Input
												label={`Answer ${index+1}`}
												placeholder='Enter answer here.'
												value={this.state.answers2[index].question}
												required
												id={`question2-${index}`}
												onChange={this.handleInputChange}
												width={13}
											/>
											<Form.Input
												label={`Point for answer ${index+1}`}
												placeholder='Enter point here.'
												type={"number"}
												value={this.state.answers2[index].score}
												readOnly
												id={`question2-point${index}`}
												width={2}
											/>
										</div>

									)

								})}
							</Form.Field>
							<Form.Field>
								<Form.Input
									label={"Question 3"}
									placeholder='Enter your question here.'
									value={this.state.question3}
									required
									id={"question3"}
									onChange={this.handleInputChange}
								/>
								{this.state.answers3.map((answer,index)=> {
									return (
										<div style={{display:"flex",justifyContent:"space-between",marginLeft:"20px"}}>
											<Form.Input
												label={`Answer ${index+1}`}
												placeholder='Enter answer here.'
												value={this.state.answers3[index].question}
												required
												id={`question3-${index}`}
												onChange={this.handleInputChange}
												width={13}
											/>
											<Form.Input
												label={`Point for answer ${index+1}`}
												placeholder='Enter point here.'
												type={"number"}
												value={this.state.answers3[index].score}
												readOnly
												id={`question3-point${index}`}
												width={2}
											/>
										</div>
									)
								})}
							</Form.Field>
							<Form.Field>
								<Form.Input
									label={"Question 4"}
									placeholder='Enter your question here.'
									value={this.state.question4}
									required
									id={"question4"}
									onChange={this.handleInputChange}
								/>
								{this.state.answers3.map((answer,index)=> {
									return (
										<div style={{display:"flex",justifyContent:"space-between",marginLeft:"20px"}}>
											<Form.Input
												label={`Answer ${index+1}`}
												placeholder='Enter answer here.'
												value={this.state.answers4[index].question}
												required
												id={`question4-${index}`}
												onChange={this.handleInputChange}
												width={13}
											/>
											<Form.Input
												label={`Point for answer ${index+1}`}
												placeholder='Enter point here.'
												type={"number"}
												value={this.state.answers4[index].score}
												readOnly
												id={`question4-point${index}`}
												width={2}
											/>
										</div>
									)
								})}
							</Form.Field>
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
		createQuestionnarie: (data, callback) => {
			dispatch(questionnarieActions.createQuestionnarieAction(data, callback));
		},
	}
};

const mapStateToProps = (state, ownProps) => {
	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuestionnarie))