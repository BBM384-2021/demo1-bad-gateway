import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import {
  Loader,
  Segment,
  Message,
  Table, Grid, Button, Card, Image,
} from 'semantic-ui-react';
import Page from "../base/Page";
import {getRoles} from "../../utils/auth";
import { Link } from 'react-router-dom';
import * as clubRequestActions from '../../api/actions/clubRequest';
import * as categoryActions from '../../api/actions/category';
import * as clubActions from '../../api/actions/club';
import Header from '../common/Header';
import SubClubItems from '../subClub/SubClubItems';
import ClubRequestItems from './ClubRequestItems';


class ClubRequestList extends Component {
  state = {
    status: LoadingStates.NOT_LOADED,
    roles:[],
    categories: [],
    clubs:[]
  };


  constructor(props) {
    super(props);
    this.handleClubRequestList = this.handleClubRequestList.bind(this);
    this.handleGetCategories = this.handleGetCategories.bind(this);
    this.handleGetClubs = this.handleGetClubs.bind(this);
  }

  componentDidMount() {
    this.props.getClubRequestList(0, this.handleClubRequestList);
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

  handleClubRequestList(data) {
    this.setState({
      ClubRequestList: data.content,
      status: LoadingStates.LOADED
    })
  }

  render() {
    const {status} = this.state;
    let roles = getRoles();
    if (status !== LoadingStates.LOADED) {
      return (
        <Loader active>
          Loading...
        </Loader>
      )
    }

    return (

      <Page>
        <Page.Header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>
          <Page.Header.Item><p style={{color: "black", fontFamily: 'Ubuntu Mono ', fontSize: "30px"}}>Club Request List</p></Page.Header.Item>
        </Page.Header>
        <Page.Content>
          <Segment>
            {roles ? roles.find((item)=> item==="ADMIN") &&<div>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Club Name</Table.HeaderCell>
                      <Table.HeaderCell>Request Count</Table.HeaderCell>
                      <Table.HeaderCell>Operation</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      this.state.ClubRequestList.length === 0 ?
                        <div textAlign={"center"} ><br/><Message color={"red"}>No sub-club is available to show</Message>
                        </div>:

                        this.state.ClubRequestList.map((clubRequest) =>
                          <ClubRequestItems
                            key={clubRequest.id}
                            clubRequest={clubRequest}
                          />
                        )
                    }
                  </Table.Body>
                </Table></div>:null
            }

          </Segment>
        </Page.Content>
      </Page>
    )
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getClubRequestList: (page, callback) => {
      dispatch(clubRequestActions.ClubRequestListAction(page, callback));
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

export default connect(mapStateToProps, mapDispatchToProps)(ClubRequestList);
