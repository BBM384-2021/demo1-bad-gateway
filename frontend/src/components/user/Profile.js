import React, {Component} from 'react'
import {Button, Icon, Loader, Segment, Table, Image, Grid, List} from "semantic-ui-react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import defaultImage from '../../static/image/white-image.png'
import * as authActions from "../../api/actions/auth";
import * as friendshipActions from "../../api/actions/friendship";

import {LoadingStates} from "../../constants/common";
import Page from "../base/Page";

class Profile extends Component {
    state = {
        status: LoadingStates.NOT_LOADED,
        userInfo: null,
        friendshipsWaiting:[]
    };

    constructor(props) {
        super(props);
        this.acceptRequestCallback = this.acceptRequestCallback.bind(this);
        this.rejectRequestCallback = this.rejectRequestCallback.bind(this);
    }

    componentDidMount() {

        this.setState({
            status: LoadingStates.LOADING
        });
        this.props.getWaitingFriendshipRequests(this.handleFriendshipsCallback)
        this.props.getProfileInfo(this.profileInfoCallback);
    }

    handleFriendshipsCallback = (data) => {
        console.log("firn waiting")
        console.log(data)
        this.setState({
            ...this.state,
            friendshipsWaiting:data
        })
    }
    acceptRequest(id){
        this.props.acceptFriendshipRequest(id,this.acceptRequestCallback)
    }
    rejectRequest(id){
        this.props.rejectFriendshipRequest(id,this.rejectRequestCallback)
    }
    rejectRequestCallback(data){
        let {friendshipsWaiting} = this.state;
        friendshipsWaiting = friendshipsWaiting.filter(waiting => waiting.id !== data.id)
        this.setState({
            ...this.state,
            friendshipsWaiting: friendshipsWaiting
        })
    }
    acceptRequestCallback(data){
        console.log("accepted")
        console.log(data)
        let {friendshipsWaiting} = this.state;
        friendshipsWaiting = friendshipsWaiting.filter(waiting => waiting.id !== data.id)
        this.setState({
            ...this.state,
            friendshipsWaiting: friendshipsWaiting
        })
    }
    profileInfoCallback = (userInfo) => {
        this.setState({
            status: LoadingStates.LOADED,
            userInfo: userInfo,
        })
    };

    render() {
        const {status, userInfo} = this.state;

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
                    <Page.Header.Item>Profile</Page.Header.Item>
                </Page.Header>
                <Grid divided centered padded="vertically" columns={2} relaxed='very'>
                <Grid.Column width={11}>
                    <Page.Operation>
                        <Page.Operation.Buttons>
                            <Button compact size={"small"} as={Link} to={"/user/update/" + this.state.userInfo.id}>
                                <Icon name='edit' color={"blue"}/>
                                Edit
                            </Button>
                            <Button compact size={"small"} as={Link} to={"/user/change-password/"}>
                                <Icon name='edit' color={"blue"}/>
                                Change Password
                            </Button>
                        </Page.Operation.Buttons>
                    </Page.Operation>
                </Grid.Column>
                    <Grid.Column width={5}>
                        <h2 style={{padding:"5px",borderBottom:"1px solid purple"}}>Friendship Requests</h2>
                    </Grid.Column>
                </Grid>
                <Grid divided centered padded="vertically" columns={2} relaxed='very'>
                    <Grid.Column width={11}>
                        <Page.Content>
                            <Segment>

                                <Image
                                  centered
                                  size='medium'
                                  src={defaultImage}
                                />
                                <Table celled striped>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell collapsing>
                                                Name/Surname
                                            </Table.Cell>
                                            <Table.Cell>{this.state.userInfo.name}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell collapsing>
                                                User
                                            </Table.Cell>
                                            <Table.Cell>{this.state.userInfo.username}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell collapsing>
                                                Email
                                            </Table.Cell>
                                            <Table.Cell>{this.state.userInfo.email}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell collapsing>
                                                Phone Number
                                            </Table.Cell>
                                            <Table.Cell>{this.state.userInfo.phone}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Page.Content>

                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Page.Content>
                            <List>
                            {this.state.friendshipsWaiting.length > 0  ?
                              this.state.friendshipsWaiting.map((request)=> {
                                    return (
                                      <List.Item>
                                          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
                                          <List.Content>
                                              <div style={{display:"flex",justifyContent:"space-between"}}>
                                                  <div>
                                                      <p style={{display:"inline",paddingRight:"10px"}}>{request.requester.name}</p>
                                                  </div>
                                                  <div>
                                                      <Button positive onClick={()=> this.acceptRequest(request.requester.id)}>Accept</Button>
                                                      <Button negative onClick={()=> this.rejectRequest(request.requester.id)}>Reject</Button>
                                                  </div>
                                              </div>
                                          </List.Content><br/>
                                      </List.Item>
                                     )
                               })
                              :
                              <h4>No Requests</h4>}
                            </List>
                        </Page.Content>
                    </Grid.Column>
                </Grid>
            </Page>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfileInfo: (callback) => {
            dispatch(authActions.userInfoAction(callback))
        },
        getWaitingFriendshipRequests:(callback) => {
            dispatch(friendshipActions.getFriendshipsWaiting(callback))
        },
        acceptFriendshipRequest:(id,callback) => {
            dispatch(friendshipActions.acceptFriendshipRequest(id,callback))
        },
        rejectFriendshipRequest:(id,callback) => {
            dispatch(friendshipActions.rejectFriendshipRequest(id,callback))
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth,
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
