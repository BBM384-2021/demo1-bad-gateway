import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as clubActions from "../../api/actions/club";
import {Button, Form, Dropdown, Segment, Header, Message} from "semantic-ui-react";
import * as categoryActions from "../../api/actions/category";


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
		console.log("error")
		console.log(error)
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
		const {club,categoryName} = this.state
		console.log(club)
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
		console.log(data)
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
		},getCategories: (callback) => {
			dispatch(categoryActions.getAllCategoriesAction(callback));
		},
	}
};

const mapStateToProps = (state, ownProps) => {

	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateClub))