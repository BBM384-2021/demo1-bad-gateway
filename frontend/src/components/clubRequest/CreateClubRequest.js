import React, {Component} from 'react';
import {withRouter} from "react-router";
import { Button, Icon, Segment, Form, Message, Dropdown, Select, TextArea, Header } from 'semantic-ui-react';
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Link} from "react-router-dom";
import * as clubRequestActions from '../../api/actions/clubRequest';
import * as clubActions from '../../api/actions/club';


class CreateClubRequest extends Component {

  state = {
    data: {
      clubName: "",
    },

    isHidden: true,
    isSuccess: false,
    isError: false,

    messageHeader: "",
    messageForm: "",

    clubs:[],
    allSubClubs:[],
    submitStatus: null,
  };

  constructor(props) {
    super(props);
    this.handleClubRequestInfo = this.handleClubRequestInfo.bind(this);
    this.handleGetClubs = this.handleGetClubs.bind(this);
  }

  componentDidMount(){
    this.props.getClubs(this.handleGetClubs);
  }

  handleGetClubs(data) {
    this.setState({
        ...this.state,
        clubs: data,
      }
    )
  }

  handleClubRequestInfo(data) {
    this.setState({
      data: data,
      status: LoadingStates.LOADED
    })
    if(data.success === true){
      this.setState({
        isError:false,
        isHidden:false,
        isSuccess:true,
        messageHeader:data.message,
        messageFrom:data.message
      })
      setTimeout(() => {
        this.props.history.push('/club/list');
      },2000)
    }
    else {
      this.setState({
        isError:true,
        isHidden:false,
        isSuccess:false,
        messageHeader:data.message,
        messageFrom:data.message
      })
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const spaceCharacter = " ";
    const newLineCharacter = "\n";
    if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
      return;
    if(this.state.clubs.indexOf(value) > -1 ) {
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
      data: {
        ...this.state.data,
        [event.target.id]: value
      }
    })
  }


  handleSubmit = (event) => {
    if(this.state.data.clubName === ""){
      this.setState({
        isError:true,
        isHidden:false,
        isSuccess:false,
        messageHeader:"Please fill in all fields in the form!",
        messageFrom:"Please fill in all fields in the form!"
      })
      return;
    }
    this.setState({
      submitStatus: true,
      isError:false,
      isHidden:true,
      isSuccess:true,
    });
    this.props.createClubRequest(this.state.data, this.handleClubRequestInfo);
  }

  render() {
    return (
      <Page>
        <br/>
        <Page.Content>
          <Message
            hidden={this.state.isHidden}
            success={this.state.isSuccess}
            error={this.state.isError}
            header={this.state.messageHeader}
            content={this.state.messageForm}
            className={"message-auth"}
          />
          <Segment>
            <Header className={"loginHeader"} size={"large"} >Request Club!</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input id={"clubName"}
                          fluid
                          required
                          placeholder='Club Name'
                          value={this.state.data.clubName}
                          onChange={this.handleInputChange}
                          label='Club Name'
                          maxLength="100"
                          inline
              />
            </Form>
            <br/>
            <Button size={"large"} as={Link} onClick={this.handleSubmit} color='orange'>
              Save
            </Button>
          </Segment>
        </Page.Content>
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createClubRequest: (body, callback) => {
      dispatch(clubRequestActions.createClubRequestAction(body, callback));
    },
    getClubs: (callback) => {
      dispatch(clubActions.getAllClubNamesAction(callback));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  const {auth} = state;

  return {
    auth
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClubRequest));