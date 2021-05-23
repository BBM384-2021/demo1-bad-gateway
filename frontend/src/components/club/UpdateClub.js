import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as clubActions from "../../api/actions/club";
import {Button, Form, Dropdown, Segment, Header, Message} from "semantic-ui-react";
import * as categoryActions from "../../api/actions/category";
import {FILE_UPLOAD_DOC_TYPES, FILE_UPLOAD_STATUS_SUCCESS} from "../../constants/common/file";
import FileInput from "../base/FileInput";


const statusOptions = [
	{ key: 'a', text: 'Active', value: 'ACTIVE' },
	{ key: 'p', text: 'Passive', value: 'PASSIVE' },
]


class UpdateClub extends Component{

	constructor(props) {
		super(props);
		this.state = {
			club:null,
			categories:[],
			categoryName:"",
			statusLoading:LoadingStates.NOT_LOADED,
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
			messageForm: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleClubInfo = this.handleClubInfo.bind(this);
		this.handleDismiss = this.handleDismiss(this);
		this.handleGetCategories = this.handleGetCategories.bind(this);
		this.uploadFileCallback = this.uploadFileCallback.bind(this);
		this.uploadFileErrorCallback = this.uploadFileErrorCallback.bind(this);
		this.selectFile = this.selectFile.bind(this);
	}
	handleClubInfo(data) {
		console.log("handle")
		console.log(data)
		this.setState({
				club: data,
				categoryName:data.category.name,
				statusLoading: LoadingStates.LOADED
			}
		)
	}
	componentDidMount() {
		console.log("inside")
		const {id} = this.props.match.params;
		this.props.getClubInfo(id, this.handleClubInfo);
		this.props.getCategories(this.handleGetCategories);
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

	selectFile = (state) => {
		return (event, file, message) => {
			this.setState({
				[state]: file,
				[state + 'Message']: message
			});


		}
	};


	handleDismiss = () => {
		this.setState({isHidden: true})
	}
		handleInputChange(event,data){
		const value = data.value;
		const spaceCharacter = " ";
		const newLineCharacter = "\n";
		if(data.id==="categoryName" && value){
			this.setState({
				isError:false,
				isHidden:true,
				isSuccess:true,
				[data.id]: value
			})
		}
		if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
			return;
		console.log("before set state")
		this.setState(prevState=>({
			club:{
				...prevState.club,
				[data.id]: value
			}

		}))
		console.log("after set state")
	}

	submitFormCallback = (error) => {
		//console.log(this.state.usernameInput)
		this.setState({
			isFormSubmitting: true,
			submitStatus: null,
		});

		const formData = new FormData();

		if(this.state.photo){
			formData.append("photo", this.state.photo);
		}

		this.props.uploadFiles(this.state.club.name, formData, this.uploadFileCallback, this.uploadFileErrorCallback)


		this.setState({
			isHidden: false,
			messageHeader: "Club Updated Successfully",
			messageForm: error,
			isSuccess: true,
			isError: false,
		})

		setTimeout(() => {
			this.props.history.push("/club/info/" + this.state.club.id);
		},2000)
	};


	submitForm(event){
		event.preventDefault();
		const {club,categoryName, photo} = this.state

		this.setState({
			photoMessage: null,
		});

		if(categoryName===""){
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
			id:club.id,
			name:club.name,
			description:club.description,
			category:categoryName,
			members:club.members,
			status:club.status
		};

		this.props.updateClub(data, this.submitFormCallback);
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	render() {
		const{club,categoryName}=this.state;
		return (
			<Page>
				{LoadingStates.LOADED &&
				<Page.Content>
					<Message
						hidden={this.state.isHidden}
						success={this.state.isSuccess}
						error={this.state.isError}
						header={this.state.messageHeader}
						content={this.state.messageForm}
					/>
					<Segment  >
						<Header className={"loginHeader"} size={"large"} >Update {club? club.name : "Club"}</Header>
						<Form.Field>
							<FileInput selectFileCallback={this.selectFile('photo')} buttonIcon={"photo"} buttonText={"Photo"} fileTypes={FILE_UPLOAD_DOC_TYPES} />
						</Form.Field>
						<Form onSubmit={this.submitForm}>
							<Form.Field>
								<Form.Input
									label={"Name"}
									value={club ? club.name : this.state.nameInput}
									required
									id={"name"}
									onChange={this.handleInputChange}
								/>
							</Form.Field>
							<Form.Field>
								<Form.Input
									label={"Description"}
									placeholder='Description'
									type='text'
									value={club ? club.description :this.state.descriptionInput}
									required
									id={"description"}
									onChange={this.handleInputChange}/>
							</Form.Field>
							<p>Category *</p>
							<Form.Field>
								<Dropdown
									fluid
									selection
									id={"categoryName"}
									options={this.state.categories.map((key) => ({text: key.name, value: key.name}))}
									placeholder={"Category"}
									value={this.state.categoryName}
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
									value={club ? club.status :this.state.status}
									onChange={this.handleInputChange}
								/>
							</Form.Field>


							<Button color='violet' type='submit' >Submit</Button>
						</Form>
					</Segment>
				</Page.Content>
				}

			</Page>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateClub: (data, callback) => {
			dispatch(clubActions.updateClubAction(data, callback));
		},
		getClubInfo: (id, callback) => {
			dispatch(clubActions.clubInfoAction(id, callback));
		},
		getCategories: (callback) => {
			dispatch(categoryActions.getAllCategoriesAction(callback));
		},
		uploadFiles: (id, data, callback, uploadFileErrorCallback) => {
			dispatch(clubActions.uploadPhotoAction(id, data, callback, uploadFileErrorCallback))
		},
	}
};

const mapStateToProps = (state, ownProps) => {

	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateClub))