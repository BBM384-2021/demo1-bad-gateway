import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import * as clubActions from "../../api/actions/club";
import * as categoryActions from "../../api/actions/category";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message} from "semantic-ui-react";


const statusOptions = [
	{ key: 'a', text: 'Active', value: 'ACTIVE' },
	{ key: 'p', text: 'Passive', value: 'PASSIVE' },
]

class AddCategory extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nameInput: "",
			

			isHidden: true,
			isSuccess: false,
			isError: false,

			messageHeader: "",
			messageForm: "",
            
			categories: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleGetCategories = this.handleGetCategories.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	componentDidMount() {
		//this.props.getCategories(this.handleGetCategories);
	}

	handleGetCategories(data) {
		this.setState({
				...this.state,
				categories: data,
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
		this.setState({
			isHidden: false,
			messageHeader: "Category Added",
			messageForm: error,
			isSuccess: true,
			isError: false,
		})
		
	};

	submitForm(event){
		event.preventDefault();
		const {nameInput, descriptionInput, categoryInput, status} = this.state
        console.log(nameInput)
		if(categoryInput===""){
			this.setState({
				isError:true,
				isHidden:false,
				isSuccess:false,
				messageHeader:"Missing Data: Category Field must be selected!",
				messageFrom:"Category Field must be selected!"
			})
			return;
		};
        const data = {
            name: nameInput
        }
        this.props.addCategory(this.submitFormCallback,data);

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
					<Header className={"loginHeader"} size={"large"} >Add Category</Header>
					<Form onSubmit={this.submitForm}>
						<Form.Field>
							<Form.Input
								label={"Name"}
								placeholder='Category Name'
								value={this.state.nameInput}
								required
								id={"nameInput"}
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
		addCategory: (data, callback) => {
			dispatch(categoryActions.addCategoryAction(data, callback));
		},
		getCategories: (callback) => {
			dispatch(categoryActions.getAllCategoriesAction(callback));
		},

	}
};

const mapStateToProps = (state, ownProps) => {

	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCategory))