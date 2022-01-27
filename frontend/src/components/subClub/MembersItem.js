import React, {Component} from 'react';
import {Image, List,Button} from 'semantic-ui-react';
import * as friendshipActions from '../../api/actions/friendship';
import '../../static/css/common/Application.css'
import {connect} from "react-redux";


class MembersItem extends Component{

  sendRequest(userId,callback){
    console.log("inside req",userId)
    this.props.sendFriendRequest(userId,callback)
  }
  handleResponse(data){
    console.log("handleResponse")
    console.log(data)
    //this.props.addFriendship(data)
  }
  render(){

    const {member,friends,waiting,rejected,addFriendship} = this.props;
    return(
      <List.Item>
        <br/>
        <List.Content floated='right'>
          {friends && <Button positive >Friends</Button>}
          {waiting && <Button color='yellow'>Waiting</Button>}
          {rejected && <Button negative>Rejected</Button>}
          {!friends && !waiting && !rejected && <Button color='blue' onClick={()=> this.sendRequest(member.id,addFriendship)}>Add Friend</Button>}
        </List.Content>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
        <List.Content>{member.name}</List.Content><br/>
        <br/>
      </List.Item>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendFriendRequest: (id, callback) => {
      dispatch(friendshipActions.sendFriendRequest(id, callback));
    }
  }
};
const mapStateToProps = (state, ownProps) => {
  return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(MembersItem);