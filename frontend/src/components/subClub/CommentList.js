import React, {Component} from 'react';
import {connect} from "react-redux";
import * as subClubActions from '../../api/actions/subClub';
import { Comment, Rating } from 'semantic-ui-react';
import defaultProfilePhoto from '../../static/image/pp.png'

class CommentList extends Component{
  state = {
    comments: [],
  };

  constructor(props) {
    super(props);
    this.handleCommentList = this.handleCommentList.bind(this);
  }

  componentDidMount() {
    const {subClubId} = this.props;
    if(subClubId === null || subClubId === ""){
      this.setState({
        comments: []
      });
    } else {
      this.props.getComments(subClubId, this.handleCommentList);
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.subClubId !== this.props.subClubId){
      if(this.props.subClubId === null || this.props.subClubId  === ""){
        this.setState({
          comments: []
        });
      } else {
        const {subClubId} = this.props;
        this.props.getComments(subClubId, this.handleCommentList);
      }
    }
  }

  handleCommentList(data) {
    let comments = [];
    data.forEach((Comment) => {
      comments.push({value: {id:Comment.id, sender:Comment.sender, content:Comment.content,
          rate:Comment.rate, club:Comment.club, subClub:Comment.subClub, sentAt:Comment.sentAt}});
    });
    this.setState({
      comments: comments,
    })
  }

  handleDropdownChange = (event, data) => {
    this.props.stateChangeCallback(data.value);
  };

  render(){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if(this.props.subClubId){
      return(
        this.state.comments.map((comment) =>
          <Comment>
            <br/>
            <Comment.Avatar src= {defaultProfilePhoto}/>
            <Comment.Content>
              <Comment.Author as='a'>{comment.value.sender.name}</Comment.Author>
              <Comment.Metadata>
                <div>{new Date(comment.value.sentAt).toLocaleDateString([], options)}</div>
              </Comment.Metadata>
              <div>
                <Rating maxRating={5} defaultRating={comment.value.rate}  icon='star' size='mini' />
              </div>
              <Comment.Text>{comment.value.content}</Comment.Text>
            </Comment.Content>
            <br/>
          </Comment>
        )
      )
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getComments: (subClubId, callback) => {
      dispatch(subClubActions.subClubCommentListAction(subClubId, callback));
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  const {commentList} = state;

  return {
    commentList
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);