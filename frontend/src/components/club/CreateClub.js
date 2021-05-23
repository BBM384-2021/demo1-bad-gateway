import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as clubActions from "../../api/actions/club";
import * as categoryActions from "../../api/actions/category";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message, Icon} from "semantic-ui-react";
import {FILE_UPLOAD_DOC_TYPES, FILE_UPLOAD_STATUS_SUCCESS} from "../../constants/common/file";
import FileInput from "../base/FileInput";


const statusOptions = [
	{ key: 'a', text: 'Active', value: 'ACTIVE' },
	{ key: 'p', text: 'Passive', value: 'PASSIVE' },
]

class CreateClub extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameInput: "",
			descriptionInput: "",
			categoryInput: "",
			status:"ACTIVE",

			photo: null,
			photoMessage: null,

			submitStatus: null,
			submitErrors: {},
			isFormSubmitting: false,

			isHidden: true,
			isSuccess: false,
			isError: false,

			messageHeader: "",
			messageForm: "",
			categories: [],
			allClubs:[],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleGetCategories = this.handleGetCategories.bind(this);
		this.handleGetClubs = this.handleGetClubs.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.uploadFileCallback = this.uploadFileCallback.bind(this);
		this.uploadFileErrorCallback = this.uploadFileErrorCallback.bind(this);
		this.selectFile = this.selectFile.bind(this);
	}

	componentDidMount() {
		this.props.getCategories(this.handleGetCategories);
		this.props.getClubs(this.handleGetClubs);
	}

	handleGetClubs(data) {
		this.setState({
				...this.state,
				allClubs: data,
			}
		)
	}

	handleGetCategories(data) {
		this.setState({
				...this.state,
				categories: data,
			}
		)
	}

	uploadFileCallback = (result) => {
		if (result.success) {
			this.setState({
				submitStatus: FILE_UPLOAD_STATUS_SUCCESS,
				submitErrors: {},
				isFormSubmitting: false,
				photo: null,
			});
		}
	};

	uploadFileErrorCallback = () => {
		this.setState({
			isFormSubmitting: false,
		});
	};


	resetInputFile = (event) => event.target.value = null;

	dismissMessage = (state) => {
		return (event) => {
			this.setState({
				[state + 'Message']: null,
			});
		}
	};

	renderMessage(message, state, messagePrefix){
		return (
			<Message
				icon={message.icon}
				color={message.color}
				content={<React.Fragment>{messagePrefix && <b>{messagePrefix}:</b> }{message.content} </React.Fragment>}
				onDismiss={this.dismissMessage(state)}
			/>
		)
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

		if(this.state.allClubs.indexOf(value) > -1 ) {
			this.setState({
				isError:true,
				isHidden:false,
				isSuccess:false,
				messageHeader:"Club with that name already exists!",
				messageFrom:"Club with that name already exists!"
			})
			return;
		}
		this.setState({
			isError:false,
			isHidden:true,
			isSuccess:true,
			[data.id]: value
		})
	}

	submitFormCallback = (error) => {
		console.log("asd")
		console.log(error)
		this.setState({
			isFormSubmitting: true,
			submitStatus: null,
		});

		const formData = new FormData();

		if(this.state.photo){
			formData.append("photo", this.state.photo);
		}

		this.props.uploadFiles(this.state.nameInput, formData, this.uploadFileCallback, this.uploadFileErrorCallback)

		this.setState({
			isHidden: false,
			messageHeader: "Club Created",
			messageForm: error,
			isSuccess: true,
			isError: false,
		})
		setTimeout(() => {
			this.props.history.push(`/questionnarie/create/${error.id}`);
		},2000)
	};

	selectFile = (state) => {
		return (event, file, message) => {
			this.setState({
				[state]: file,
				[state + 'Message']: message
			});
		}
	};

	submitForm(event){
		event.preventDefault();
		const {nameInput, descriptionInput, categoryInput, status, photo} = this.state

		this.setState({
			photoMessage: null,
		});

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
		const {isFormSubmitting, submitStatus, status} = this.state;

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

					<Form.Field>
						<FileInput selectFileCallback={this.selectFile('photo')} buttonIcon={"photo"} buttonText={"Photo"} fileTypes={FILE_UPLOAD_DOC_TYPES} />
					</Form.Field>
					<Form onSubmit={this.submitForm}>
						<br/>
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
								options={this.state.categories.map((key) => ({text: key.name, value: key.name}))}
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
		getCategories: (callback) => {
			dispatch(categoryActions.getAllCategoriesAction(callback));
		},
		uploadFiles: (id, data, callback, uploadFileErrorCallback) => {
			dispatch(clubActions.uploadPhotoAction(id, data, callback, uploadFileErrorCallback))
		},
		getClubs: (callback) => {
			dispatch(clubActions.getAllClubNamesAction(callback));
		},
	}
};

const mapStateToProps = (state, ownProps) => {

	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClub))