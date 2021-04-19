import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import { Button, Form, Loader, Segment, Table, Message, Icon, Card } from 'semantic-ui-react';
import * as clubActions from "../../api/actions/club";
import ClubsItem from "./ClubsItem";
import Page from "../base/Page";


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
          <Page.Header.Item>Clubs List</Page.Header.Item>
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
