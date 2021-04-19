import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as clubActions from "../../api/actions/club";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

const statusOptions = [
	{ key: 'a', text: 'Active', value: 'ACTIVE' },
	{ key: 'p', text: 'Passive', value: 'PASSIVE' },
]
const categoryOptions = [
	{ key: 'm', text: 'Music', value: 'Music' },
	{ key: 's', text: 'Sport', value: 'Sport' },
]

class CreateClub extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameInput: "",
			descriptionInput: "",
			categoryInput: "",
			status:"ACTIVE",

			isHidden: true,
			isSuccess: false,
			isError: false,

			messageHeader: "",
			messageForm: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleInputChange(event,data){
		const value = data.value;
		const spaceCharacter = " ";
		const newLineCharacter = "\n";
		if(data.id==="categoryInput" && value){
			this.setState({
				isError:false,
				isHidden:true,
				isSuccess:true
			})
		}
		if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
			return;

		this.setState({
			[data.id]: value
		})
	}
	submitFormCallback = (error) => {
		console.log(this.state.usernameInput)
		this.setState({
			isHidden: false,
			messageHeader: "",
			messageForm: error,
			isSuccess: false,
			isError: true,
		})
	};

	submitForm(event){
		event.preventDefault();
		const {nameInput, descriptionInput, categoryInput, status} = this.state
		if(categoryInput===""){
			this.setState({
				isError:true,
				isHidden:false,
				isSuccess:false,
				messageHeader:"Missing Data: Category Field must be selected!",
				messageFrom:"Category Field must be selected!"
			})
			return;
		}
		console.log(nameInput,
			descriptionInput,
			categoryInput,
			status)
		const data = {
			id:Math.random(),
			name:nameInput,
			description:descriptionInput,
			category:categoryInput,
			members:[],
			status
		};

		this.props.createClub(data, this.submitFormCallback);
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
					<Header className={"loginHeader"} size={"large"} >Create Club</Header>
					<Form onSubmit={this.submitForm}>
						<Form.Field>
							<Form.Input
								label={"Name"}
								placeholder='Club Name'
								value={this.state.nameInput}
								required
								id={"nameInput"}
								onChange={this.handleInputChange}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input
								label={"Description"}
								placeholder='Description'
								type='text'
								value={this.state.descriptionInput}
								required
								id={"descriptionInput"}
								onChange={this.handleInputChange}/>
						</Form.Field>
						<p>Category *</p>
						<Form.Field>
							<Dropdown
								fluid
								selection
								id={"categoryInput"}
								options={categoryOptions}
								placeholder={"Category"}
								value={this.state.categoryInput}
								onChange={this.handleInputChange}
							/>
						</Form.Field>
						<p>Status *</p>
						<Form.Field>
							<Dropdown
								fluid
								selection
								id={"status"}
								options={statusOptions}
								placeholder={"Status"}
								value={this.state.status}
								onChange={this.handleInputChange}
							/>
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
		createClub: (data, callback) => {
			dispatch(clubActions.clubCreateAction(data, callback));
		},
	}
};

const mapStateToProps = (state, ownProps) => {

	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClub))