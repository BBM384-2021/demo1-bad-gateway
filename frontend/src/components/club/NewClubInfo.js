import React, {Component} from "react";
import * as clubActions from "../../api/actions/club";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LoadingStates} from "../../constants/common";
import {
  Button,
  List,
  Grid,
  Header,
  Divider,
  Loader,
  Message,
  Image,
  Card,
  Comment,
  Form, Rating,
} from 'semantic-ui-react';
import MemberItem from "./MemberItem";
import SubClubs from "./SubClubs";
import CommentList from "./CommentList";

import Page from "../base/Page";
import {Link} from "react-router-dom";
import {getRoles} from "../../utils/auth";
import * as SubClubActions from "../../api/actions/subClub";

// Club a üye olanlarda yorum yap butonu ve chat olacak
class NewClubInfo extends Component {
  state = {
    status: LoadingStates.NOT_LOADED,
    fields: {
      content: "",
      rate: "",
      club: "",
    },
    comment: {},
    club: {},
    roles:[],
    enrolledClubs:null,
    commentInput:"",
    photo: null
  };

  constructor(props) {
    super(props);
    this.handleClubInfo = this.handleClubInfo.bind(this);
    this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.handleCommentCreate = this.handleCommentCreate.bind(this);
    this.handleGetEnrolledSubClubs = this.handleGetEnrolledSubClubs.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    const {auth} = this.props;
    this.props.getClubInfo(id, this.handleClubInfo);
    if(localStorage.getItem("token")){
      this.props.getEnrolledSubClubs(id, this.handleGetEnrolledSubClubs)
    }
    this.setState({
      ...this.state,
      enrolledClubs:[]
    })

  }

  handleCommentCreate(data) {
    if(data.content !== "" && data.rate !== ""){
      this.setState({
        fields: "",
        comment: "",
      })
      window.location.href = window.location.href;
    }
  }

  handleGetEnrolledSubClubs(data){
    this.setState({
      ...this.state,
      enrolledClubs:data
    })
  }
  loadImage() {
    console.log(this.state)

    if(this.state.club.photoFileName !== null){
      import(`../../static/image/common/${this.state.club.photoFileName}`)
          .then(image => {
            this.setState({ photo: image.default })
          })
    }

  }

  handleContentChange= (e, { value }) => this.setState({
    fields: {
      ...this.state.fields,
      content: value
    }
  });


  onFormSubmit = () => {
    const {content, rate} = this.state.fields
    this.setState({
      isFormSubmitting: false,
      submitStatus: true,
    });

    let data = {
      id: this.state.fields.id,
      content: content,
      rate: rate,
      club: this.state.club,
    }
    if(this.state.fields.content !== "" && this.state.fields.rate !== ""){
      this.props.createCommentInfo(data, this.handleCommentCreate);
    }
  };

  handleClubInfo(data) {
    let roles = getRoles();
    this.setState({
        club: data,
        status: LoadingStates.LOADED,
        roles:roles
      }
    )
    console.log(this.state);

    this.loadImage()
  }

  handleDeleteInfo(data) {
    this.setState({
      club: data,
      status: LoadingStates.LOADED
    })
    this.props.history.push("/club/list")
  }

  sendDeleteRequest(){
    this.props.deleteClub(this.state.club.id,this.handleDeleteInfo)
  }

  handleRate = (e, { rating }) => this.setState({
    fields: {
      ...this.state.fields,
      rate: rating
    }
  });


  render() {
    let buttonEnabled = true;
    if(this.state.fields.content !== ""  && this.state.fields.rate !== "" ){
      buttonEnabled = true;
    } else {
      buttonEnabled = false;
    }

    const { status, roles } = this.state;
    const { auth } = this.props;
    if (status !== LoadingStates.LOADED) {
      return (
        <Loader active>
          Loading...
        </Loader>
      )
    }

    return (
      <Page>
        {roles ? roles.find((item)=> item==="ADMIN") && <div style={{display:"flex",justifyContent:"flex-end",paddingBottom:"2rem"}}>
          <Link to={`/club/update/${this.state.club.id}`} style={{color: "#702BBA"}}>
            <Button primary>
              Update Club
            </Button>
          </Link>
          <Button basic color='red' onClick={this.sendDeleteRequest}>
            Delete Club
          </Button>

        </div> : null}


        <Grid divided centered padded="vertically" columns={3} relaxed='very'>
          <Grid.Column width={4}>
            <Header as='h3' textAlign='center'>
              <Header.Content style={{color: "#009933"}}>MEMBERS</Header.Content>
            </Header>
            <br/>
            <Divider/>
            <List Members divided verticalAlign='middle'>
              {
                this.state.club.members.length === 0 ?
                  <div textAlign={"center"} ><Message color={"red"}>The club has no members yet.</Message>
                  </div>:
                  this.state.club.members.map((member) =>
                    <MemberItem
                      key={member.id}
                      member={member}
                    />
                  )
              }
            </List>
          </Grid.Column>

          <Grid.Column width={8}>
            {this.state.club.photoFileName ?
                <Image centered src={this.state.photo}/>:
                <Image centered src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular />
            }

            <Header as='h1' icon textAlign='center'>
              <Header.Content style={{color: "#702BBA"}}>{this.state.club.name.toUpperCase()}
                <h4 style={{color: "#000000"}}>{this.state.club.category.name}</h4>
              </Header.Content>
            </Header>
            <Divider/>
            <Header as='h4' icon textAlign='center'>
              <Header.Content>{this.state.club.description}</Header.Content>
            </Header>

            <br/><br/><br/><br/><br/>
            <Header as='h4' icon textAlign='left'>
              <Header.Content style={{color: "#ff9900"}}>SUBCLUBS</Header.Content>
            </Header>
            <Divider/>
            <Card.Group itemsPerRow={1}>
              {this.state.enrolledClubs &&
              <SubClubs
                clubId={this.state.club.id}
                club={this.state.club}
                enrolledClubs={this.state.enrolledClubs}
              /> }
            </Card.Group>
          </Grid.Column>

          <Grid.Column width={4} textAlign="justified">
            <Comment.Group>
              <Header as='h3' textAlign='center'>
                <Header.Content style={{color: "#009933"}}>COMMENTS</Header.Content>
              </Header>
              <br/>
              <Divider/>

              <CommentList
                clubId={this.state.club.id}
                club={this.state.club}
              />
              <Form reply>
                <div>
                  <Rating maxRating={5} icon='star' size='huge' selected onRate={this.handleRate} />
                </div>
                <Form.TextArea
                  placeholder='Evaluate the Club!'
                  id={"content"}
                  type="text"
                  value={this.state.fields.content}
                  required
                  onChange={this.handleContentChange}
                />
                <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.onFormSubmit}
                        disabled={!buttonEnabled} />
              </Form>
            </Comment.Group>
          </Grid.Column>
        </Grid>
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getClubInfo: (id, callback) => {
      dispatch(clubActions.clubInfoAction(id, callback));
    },
    deleteClub: (id, callback) => {
      dispatch(clubActions.deleteClubAction(id, callback));
    },
    createCommentInfo: (data, callback) => {
      dispatch(clubActions.commentCreateAction(data, callback));
    },
    getEnrolledSubClubs: (clubId, callback) => {
      dispatch(SubClubActions.getEnrolledSubClubsAction(clubId,callback))
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewClubInfo))