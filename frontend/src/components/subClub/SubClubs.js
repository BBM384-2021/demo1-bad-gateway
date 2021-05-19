import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import {
  Button,
  Form,
  Loader,
  Segment,
  Grid,
  Message,
  Card,
  Dropdown,
  Select
} from 'semantic-ui-react';
import * as SubClubActions from "../../api/actions/subClub";
import SubClubItems from "./SubClubItems";
import Page from "../base/Page";
import { Link } from 'react-router-dom';
import * as categoryActions from "../../api/actions/category";
import * as clubActions from "../../api/actions/club";
import {getRoles} from "../../utils/auth";


class SubClubs extends Component {
  state = {
    status: LoadingStates.NOT_LOADED,
    filters: {
      name: "",
      category: "",
      parentClub:"",
    },
    roles:[],
    categories: [],
    clubs:[]
  };


  constructor(props) {
    super(props);
    this.handleSubClubList = this.handleSubClubList.bind(this);
    this.handleGetCategories = this.handleGetCategories.bind(this);
    this.handleGetClubs = this.handleGetClubs.bind(this);
  }

  componentDidMount() {
    this.props.getSubClubList(0, this.state.filters.name, this.state.filters.category, this.state.filters.parentClub, this.handleSubClubList);
    this.props.getCategories(this.handleGetCategories);
    this.props.getClubs(this.handleGetClubs);
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


  handleSubClubList(data) {
    this.setState({
      subClubList: data.content,
      status: LoadingStates.LOADED
    })
  }

  handleInputChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    const spaceCharacter = " ";
    const newLineCharacter = "\n";

    if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
      return;

    this.setState({
      filters: {
        ...this.state.filters,
        [event.target.id]: value
      }
    })

  };

  handleCategoryFilterChange= (e, { value }) => this.setState({
    filters: {
      ...this.state.filters,
      category: value
    }
  });

  handleParentClubFilterChange= (e, { value }) => this.setState({
    filters: {
      ...this.state.filters,
      parentClub: value
    }
  });

  handleFiltering = (event) => {
    this.props.getSubClubList(0, this.state.filters.name, this.state.filters.category, this.state.filters.parentClub, this.handleSubClubList);
  };

  render() {
    const {status} = this.state;
    let roles = getRoles();
    if (status !== LoadingStates.LOADED) {
      return (
        <Loader active>
          Yükleniyor...
        </Loader>
      )
    }

    return (

      <Page>
        <Page.Header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>
          <Page.Header.Item><p style={{color: "black", fontFamily: 'Ubuntu Mono ', fontSize: "30px"}}>Sub-Club List</p></Page.Header.Item>
        </Page.Header>
        <Page.Operation>
          <Page.Operation.Filter>
            <Form onSubmit={this.handleFiltering}>
              <Form.Group>
                <Form.Field>
                  <Form.Input id={"name"}
                              placeholder='Sub-Club Name'
                              value={this.state.filters.name}
                              onChange={this.handleInputChange}
                              inline
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    selection
                    id={"category"}
                    options={this.state.categories.map((key) => ({text: key.name, value: key.name}))}
                    placeholder={"Category"}
                    value={this.state.filters.category}
                    control={Select}
                    onChange={this.handleCategoryFilterChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    selection
                    id={"parentClub"}
                    options={this.state.clubs.map((key) => ({text: key.name, value: key.name}))}
                    placeholder={"Club"}
                    value={this.state.filters.parentClub}
                    control={Select}
                    onChange={this.handleParentClubFilterChange}
                  />
                </Form.Field>
                <Form.Button content='Search'/>
              </Form.Group>
            </Form>
          </Page.Operation.Filter>
        </Page.Operation>
        <Page.Content>
          <Segment>
            {roles ? roles.find((item)=> item==="ADMIN") && <div>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column></Grid.Column>
                  <Grid.Column></Grid.Column>
                  <Grid.Column textAlign={'right'}>
                    <Button positive as={Link} to={"/sub_club/create"}>
                      Create Sub-Club
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid> </div>: null
            }
            <br/><br/>
            <Card.Group itemsPerRow={4}>
              {
                this.state.subClubList.length === 0 ?
                  <div textAlign={"center"} ><Message color={"red"}>No sub-club is available to show</Message>
                  </div>:
                  this.state.subClubList.map((subClub) =>
                    <SubClubItems
                      key={subClub.id}
                      subClub={subClub}
                    />
                  )
              }
            </Card.Group>
          </Segment>
        </Page.Content>
      </Page>
    )
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSubClubList: (page, name, category, parentClub, callback) => {
      dispatch(SubClubActions.subClubListAction(page, name, category, parentClub, callback));
    },
    getCategories: (callback) => {
      dispatch(categoryActions.getAllCategoriesAction(callback));
    },
    getClubs: (callback) => {
      dispatch(clubActions.getAllClubsAction(callback));
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  const {auth} = state;

  return {
    auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubClubs);
