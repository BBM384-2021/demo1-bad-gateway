import React, {Component} from 'react';
import {withRouter} from "react-router";
import { Button, Icon, Segment, Form, Message, Dropdown, Select, TextArea, Header } from 'semantic-ui-react';
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Link} from "react-router-dom";
import * as SubClubActions from '../../api/actions/subClub';
import * as categoryActions from '../../api/actions/category';
import * as clubActions from '../../api/actions/club';
import * as userActions from '../../api/actions/user';


class CreateSubClub extends Component {

  state = {
    subClubInfo: {
      name: "",
      parentClub: "",
      category: "",
      //admin: "",
      description: "",
    },
    categories: [],
    clubs:[],
    users:[],
    submitStatus: null,
  };

  constructor(props) {
    super(props);
    this.handleSubClubInfo = this.handleSubClubInfo.bind(this);
    this.handleGetCategories = this.handleGetCategories.bind(this);
    this.handleGetClubs = this.handleGetClubs.bind(this);
    this.handleGetUsers= this.handleGetUsers.bind(this);

  }

  componentDidMount() {
    this.props.getCategories(this.handleGetCategories);
    this.props.getClubs(this.handleGetClubs);
    this.props.getUsers(this.handleGetUsers);
  }

  handleGetCategories(data) {
    this.setState({
        ...this.state,
        categories: data,
      }
    )
  }

  handleGetClubs(data) {
    this.setState({
        ...this.state,
        clubs: data,
      }
    )
  }

  handleGetUsers(data) {
    this.setState({
        ...this.state,
        users: data,
      }
    )
  }

  handleSubClubInfo(data) {
    this.setState({
      subClubInfo: data,
      status: LoadingStates.LOADED
    })
    setTimeout(() => {
      this.props.history.push('/sub_club/list');
    },3000)
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const spaceCharacter = " ";
    const newLineCharacter = "\n";
    if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
      return;
    this.setState({
      subClubInfo: {
        ...this.state.subClubInfo,
        [event.target.id]: value
      }

    })
  }

  handleParentClubChange= (e, { value }) => this.setState({
    subClubInfo: {
      ...this.state.subClubInfo,
      parentClub: value
    }
  });

  handleCategoryChange= (e, { value }) => this.setState({
    subClubInfo: {
      ...this.state.subClubInfo,
      category: value
    }
  });

  handleAdminChange= (e, { value }) => this.setState({
    subClubInfo: {
      ...this.state.subClubInfo,
      admin: value
    }
  });

  handleSubmit = (event) => {
    this.setState({
      submitStatus: true,
    });
    this.props.createSubClub(this.state.subClubInfo, this.handleSubClubInfo);
  }

  render() {

    return (
      <Page>
        <br/>
        <Page.Content>
          <Segment>
            <Header className={"loginHeader"} size={"large"} >Create Sub-Club</Header>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input id={"name"}
                            fluid
                            placeholder='Name'
                            value={this.state.subClubInfo.name}
                            onChange={this.handleInputChange}
                            label='Name'
                            maxLength="100"
                            inline
                            required
                />
                <Form.Select
                  search
                    required
                    fluid
                    label = "Parent Club"
                    id={"parentClub"}
                    options={this.state.clubs.map((key) => ({text: key.name, value: key.name}))}
                    placeholder={"Club"}
                    value={this.state.subClubInfo.parentClub}
                    onChange={this.handleParentClubChange}
                />
              <Form.Select
                search
                required
                fluid
                label = "Category"
                id={"category"}
                options={this.state.categories.map((key) => ({text: key.name, value: key.name}))}
                placeholder={"Category"}
                value={this.state.subClubInfo.category}
                onChange={this.handleCategoryChange}
              />
              <Form.Select
                search
                required
                fluid
                label = "Sub-Club Admin"
                id={"admin"}
                options={this.state.users.map((key) => ({text: key.name, value: key.name}))}
                placeholder={"Sub-Club Admin"}
                value={this.state.subClubInfo.admin}
                onChange={this.handleAdminChange}
              />
              <Form.Field
                required
                fluid
                id={'description'}
                control={TextArea}
                label='Description'
                placeholder='Description'
                onChange={this.handleInputChange}

              />
            </Form>
            <br/>
            <Button size={"large"} as={Link} onClick={this.handleSubmit} color='orange'>
              Save
            </Button>
          </Segment>
        </Page.Content>
        {
          this.state.submitStatus && this.state.submitStatus === true &&
          <Message success icon>
            <Icon name='checkmark'/>
            <Message.Content>
              <Message.Header>
                Sub-Club başarıyla oluşturulmuştur.
              </Message.Header>
            </Message.Content>
          </Message>
        }
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createSubClub: (body, callback) => {
      dispatch(SubClubActions.createSubClubAction(body, callback));
    },
    getCategories: (callback) => {
      dispatch(categoryActions.getAllCategoriesAction(callback));
    },
    getClubs: (callback) => {
      dispatch(clubActions.getAllClubsAction(callback));
    },
    getUsers: (callback) => {
      dispatch(userActions.getAllUsersAction(callback));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  const {auth} = state;

  return {
    auth
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSubClub));