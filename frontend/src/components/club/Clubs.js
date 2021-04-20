import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import { Button, Form, Loader, Segment, Grid, Message, Icon, Card, GridColumn } from 'semantic-ui-react';
import * as clubActions from "../../api/actions/club";
import ClubsItem from "./ClubsItem";
import Page from "../base/Page";
import { Link } from 'react-router-dom';


class Clubs extends Component {
  state = {
    status: LoadingStates.NOT_LOADED,
    filters: {
      name: "",
      category: "",
    },
    nameInput: "",
    categoryInput: "",
  };


  constructor(props) {
    super(props);
    this.handleClubList = this.handleClubList.bind(this);
  }

  componentDidMount() {
    this.props.getClubList(0, this.state.filters.name, this.state.filters.category, this.handleClubList);
  }

  handleClubList(data) {
    this.setState({
      clubList: data.content,
      status: LoadingStates.LOADED
    })
  }

  handleInputChange = (event) => {
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

  handleFiltering = (event) => {
    this.props.getClubList(0, this.state.filters.name, this.state.filters.category, this.handleClubList);
  };

  render() {
    const {status} = this.state;

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
          <Page.Header.Item><p style={{color: "black", fontFamily: 'Ubuntu Mono ', fontSize: "30px"}}>Club List</p></Page.Header.Item>
        </Page.Header>
        <Page.Operation>
          <Page.Operation.Filter>
            <Form onSubmit={this.handleFiltering}>
              <Form.Group>
                <Form.Input id={"name"}
                            label='Club Name'
                            value={this.state.filters.name}
                            onChange={this.handleInputChange}
                            inline
                />
                <Form.Input id={"category"}
                            label='Category'
                            value={this.state.filters.category}
                            onChange={this.handleInputChange}
                            inline
                />
                <Form.Button content='Search'/>
              </Form.Group>
            </Form>
          </Page.Operation.Filter>
        </Page.Operation>
        <Page.Content>
          <Segment>
            <Card.Group itemsPerRow={3}>
              {
                this.state.clubList.length === 0 ?
                  <div textAlign={"center"} ><Message color={"red"}>No club is available to show</Message>
                  </div>:
                  this.state.clubList.map((club) =>
                    <ClubsItem
                      key={club.id}
                      club={club}
                    />
                  )
              }
            </Card.Group>
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Button positive as={Link} to={"/club/create"}>
                    Create Club
                  </Button>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Page.Content>
      </Page>
    )
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getClubList: (page, name, category, callback) => {
      dispatch(clubActions.clubListAction(page, name, category, callback));
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  const {auth} = state;

  return {
    auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Clubs);
