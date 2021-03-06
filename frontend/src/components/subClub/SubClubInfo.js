import React, {Component} from "react";
import * as subClubActions from "../../api/actions/subClub";
import * as eventActions from "../../api/actions/event";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {AuthStates, LoadingStates} from "../../constants/common";
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
    Form,
    Rating
} from 'semantic-ui-react';
import MembersItem from "./MembersItem";
import CommentList from "./CommentList";
import Page from "../base/Page";
import {Link} from "react-router-dom";
import {getRoles} from "../../utils/auth";
import * as clubActions from "../../api/actions/club";
import * as friendshipActions from "../../api/actions/friendship";
import * as userActions from "../../api/actions/user";
import EventsItem from "../event/EventsItem";
import SubClubChat from "../chat/SubClubChat";


// Club a üye olanlarda yorum yap butonu ve chat olacak
class SubClubInfo extends Component {
    state = {
        status: LoadingStates.NOT_LOADED,
        fields: {
            content: "",
            rate: "",
            subClub: "",
        },
        comment: {},
        subClub: {},
        roles: [],
        commentInput: "",
        photo: null,
        eventList: [],
        scores: [],
        userId: 0,
        canJoinClubs: false,
        enrolled: false,
        checkEnrolled: null,
        friendships: []
    };

    constructor(props) {
        super(props);
        this.handleSubClubInfo = this.handleSubClubInfo.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
        this.handleCommentCreate = this.handleCommentCreate.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.getScores = this.getScores.bind(this);
        this.checkIfMember = this.checkIfMember.bind(this);
        this.enrollToSubClub = this.enrollToSubClub.bind(this);
        this.enrollmentCallback = this.enrollmentCallback.bind(this);
        //this.sendGetFriendshipsRequest = this.sendGetFriendshipsRequest.bind(this);
        this.handleGetFriendshipsRequest = this.handleGetFriendshipsRequest.bind(this);
        this.addToFriendshipList = this.addToFriendshipList.bind(this);
        this.handleUserDetail = this.handleUserDetail.bind(this);
        this.handleEventList = this.handleEventList.bind(this);
        this.handleCheckEnrolledSubClub = this.handleCheckEnrolledSubClub.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {auth} = this.props;
        this.props.getSubClubInfo(id, this.handleSubClubInfo);
        this.props.getSubClubEvents(id, this.handleEventList);
        if(localStorage.getItem("token")){
            this.props.getFriendShips(this.handleGetFriendshipsRequest);
            this.props.checkEnrolledSubClub(id, this.handleCheckEnrolledSubClub);
        }
    }

    handleCheckEnrolledSubClub(data) {
        this.setState({
                ...this.state,
                checkEnrolled: data,
            }
        )
    }

    handleGetFriendshipsRequest(data) {
        console.log(data)
        this.setState({
            ...this.state,
            friendships: data
        })
    }

    addToFriendshipList(data) {
        let {friendships} = this.state
        friendships.push(data);
        console.log("new friendships");
        console.log(friendships)
        this.setState({
            ...this.state,
            friendships: friendships
        })
    }

    getScores(data) {
        let scores = JSON.parse(localStorage.getItem("scores"))

        if (scores) {
            console.log(data.parentClubId)
            let scoreOfClub = scores.find(score => score.clubId === data.parentClubId)
            let status = false;
            if (scoreOfClub && scoreOfClub.score >= 50) {
                status = true
            }
            if (scores[0]) {
                this.setState({
                    ...this.state,
                    userId: scores[0].userId,
                    canJoinClubs: status,
                })
            } else {
                this.getUserDetails();
            }

        }
    }

    getUserDetails() {
        this.props.getUserDetails(this.handleUserDetail)
    }

    handleUserDetail(data) {
        this.setState({
            ...this.state,
            userId: data.id
        })
    }

    handleCommentCreate(data) {
        if (data.content !== "" && data.rate !== "") {
            this.setState({
                fields: "",
                comment: "",
            })
            window.location.href = window.location.href;
        }
    }

    handleContentChange = (e, {value}) => this.setState({
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
            subClub: this.state.subClub.name,
        }
        if (this.state.fields.content !== "" && this.state.fields.rate !== "") {
            this.props.createCommentInfo(data, this.handleCommentCreate);
        }
    };

    handleSubClubInfo(data) {
        let roles = getRoles();
        this.setState({
                subClub: data,
                status: LoadingStates.LOADED,
                roles: roles
            }
        )
        this.getScores(data);
        this.loadImage()
    }

    handleDeleteInfo(data) {
        this.setState({
            subClub: data,
            status: LoadingStates.LOADED
        })
        this.props.history.push("/sub_club/list")
    }


    handleEventList(data) {
        console.log(data);
        this.setState({
            eventList: data
        });
    }


    loadImage() {

        if (this.state.subClub.photoFileName !== null) {
            if (typeof (this.state.subClub.photoFileName) !== 'undefined') {
                import(`../../static/image/common/${this.state.subClub.photoFileName}`)
                    .then(image => {
                        this.setState({photo: image.default})
                    })
            }
        }

    }

    sendDeleteRequest() {
        this.props.deleteSubClub(this.state.subClub.id, this.handleDeleteInfo)
    }

    handleRate = (e, {rating}) => this.setState({
        fields: {
            ...this.state.fields,
            rate: rating
        }
    });

    enrollToSubClub() {
        const {id} = this.props.match.params;
        this.props.enrollToSubClub(id, this.enrollmentCallback)

    }

    enrollmentCallback() {
        let {subClub} = this.state
        subClub.members.push({id: this.state.userId})
        this.setState({
            ...this.state,
            enrolled: true
        })
    }

    checkIfMember() {
        const {subClub, enrolled} = this.state
        if (enrolled) {
            return true;
        }
        return subClub.members.find(enrolled => enrolled.id === this.state.userId)
    }

    render() {
        let buttonEnabled = true;
        if (this.state.fields.content !== "" && this.state.fields.rate !== "") {
            buttonEnabled = true;
        } else {
            buttonEnabled = false;
        }

        const {status, roles} = this.state;
        const {auth} = this.props;
        if (status !== LoadingStates.LOADED) {
            return (
                <Loader active>
                    Loading...
                </Loader>
            )
        }

        return (
            <Page>

                {
                    (this.props.auth.loginStatus === AuthStates.VALID) &&
                    [
                        (() => {
                                if ((!(this.state.subClub.name in this.props.auth.bans)))
                                return (
                                    <React.Fragment>
                                        {roles ? roles.find((item)=> (item === "ADMIN") || ( item === "SUB_CLUB_ADMIN")) &&
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            paddingBottom: "2rem"
                                        }}>

                                                <Link to={`/sub_club/update/${this.state.subClub.id}`}
                                                      style={{color: "#702BBA"}}>
                                                    <Button primary>
                                                        Update Sub-Club
                                                    </Button>
                                                </Link>
                                                <Button basic color='red' onClick={this.sendDeleteRequest}>
                                                    Delete Sub-Club
                                                </Button>

                                        </div>: null
                                         }

                                        <Grid divided centered padded="vertically" columns={3} relaxed='very'>
                                            <Grid.Column width={4}>
                                                <Header as='h3' textAlign='center'>
                                                    <Header.Content
                                                        style={{color: "#009933"}}>MEMBERS</Header.Content>
                                                </Header>
                                                <br/>
                                                <Divider/>
                                                <List Members divided verticalAlign='middle'>
                                                    {
                                                        this.state.subClub.members.length === 0 ?
                                                            <div textAlign={"center"}><Message color={"red"}>The
                                                                sub-club
                                                                has no members yet.</Message>
                                                            </div> :
                                                            this.state.subClub.members.map((member) =>
                                                                <MembersItem
                                                                    key={member.id}
                                                                    member={member}
                                                                    addFriendship={this.addToFriendshipList}
                                                                    friends={this.state.friendships.find(friendship => (friendship.addressee.id === member.id && friendship.friendshipStatus === "ACCEPTED" && friendship.addressee.id !== this.state.userId)|| (friendship.requester.id === member.id && friendship.friendshipStatus === "ACCEPTED" && friendship.requester.id !== this.state.userId))}
                                                                    rejected={this.state.friendships.find(friendship => (friendship.addressee.id === member.id && friendship.friendshipStatus === "REJECTED" && friendship.addressee.id !== this.state.userId) || (friendship.requester.id === member.id && friendship.friendshipStatus === "REJECTED" && friendship.requester.id !== this.state.userId) )}
                                                                    waiting={this.state.friendships.find(friendship => (friendship.addressee.id === member.id && friendship.friendshipStatus === "WAITING" && friendship.addressee.id !== this.state.userId) || (friendship.requester.id === member.id && friendship.friendshipStatus === "WAITING" && friendship.requester.id !== this.state.userId))}
                                                                />
                                                            )
                                                    }
                                                </List>
                                                <Divider/>
                                                <Header as='h3' textAlign='center'>
                                                    <Header.Content style={{color: "#009933"}}>UPCOMING
                                                        EVENTS</Header.Content>
                                                </Header>
                                                {
                                                    this.props.auth.loginStatus === AuthStates.VALID ?
                                                        <Card.Group itemsPerRow={1}>
                                                            {
                                                                this.state.eventList.length === 0 ?
                                                                    <div textAlign={"center"}><Message
                                                                        size={"large"}
                                                                        color={"red"}>No
                                                                        event is available to
                                                                        show</Message>
                                                                    </div> :
                                                                    this.state.eventList.map((event) =>
                                                                        <EventsItem
                                                                            key={event.id}
                                                                            event={event}
                                                                            displayed
                                                                        />
                                                                    )
                                                            }
                                                        </Card.Group> : null
                                                }
                                            </Grid.Column>

                                            <Grid.Column width={8}>
                                                {this.state.subClub.photoFileName ?
                                                    <Image centered src={this.state.photo}/> :
                                                    <Image centered
                                                           src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                                           size='small' circular/>
                                                }
                                                <Header as='h1' icon textAlign='center'>
                                                    <Header.Content
                                                        style={{color: "#702BBA"}}>{this.state.subClub.name.toUpperCase()}
                                                        <h4 style={{color: "#000000"}}>{this.state.subClub.category.name}</h4>
                                                        {this.state.canJoinClubs ? (this.checkIfMember() ?
                                                            <Button positive floated={"right"}>Enrolled</Button> :
                                                            <Button positive floated={"right"}
                                                                    onClick={this.enrollToSubClub}>Enroll</Button>) :
                                                            <Button disabled floated={"right"}>Not
                                                                Eligible</Button>}
                                                    </Header.Content>
                                                </Header>
                                                <Divider/>
                                                <Header as='h4' icon textAlign='center'>
                                                    <Header.Content>{this.state.subClub.description}</Header.Content>
                                                </Header>

                                                <Divider/>


                                                {
                                                    (this.props.auth.loginStatus === AuthStates.VALID && this.state.checkEnrolled) ?
                                                        <SubClubChat>
                                                        </SubClubChat> : ""
                                                }



                                            </Grid.Column>

                                            <Grid.Column width={4} textAlign="justified">
                                                <Comment.Group>
                                                    <Header as='h3' textAlign='center'>
                                                        <Header.Content
                                                            style={{color: "#009933"}}>COMMENTS</Header.Content>
                                                    </Header>
                                                    <br/>
                                                    <Divider/>

                                                    <CommentList
                                                        subClubId={this.state.subClub.id}
                                                        subClub={this.state.subClub}
                                                    />
                                                    {this.state.checkEnrolled &&
                                                        <Form reply>
                                                            <div>
                                                                <Rating maxRating={5} icon='star' size='huge' selected
                                                                        onRate={this.handleRate}/>
                                                            </div>
                                                            <Form.TextArea
                                                                id={"content"}
                                                                placeholder='Evaluate the Sub-Club!'
                                                                type="text"
                                                                value={this.state.fields.content}
                                                                required
                                                                onChange={this.handleContentChange}
                                                            />
                                                            <Button content='Add Comment' labelPosition='left'
                                                                    icon='edit'
                                                                    primary onClick={this.onFormSubmit}
                                                                    disabled={!buttonEnabled}/>
                                                        </Form>
                                                    }
                                                </Comment.Group>
                                            </Grid.Column>
                                        </Grid>
                                    </React.Fragment>


                                )
                                else {
                                    return (
                                        <div textAlign={"center"}><Message color={"red"}>You are banned from this sub
                                            club</Message></div>
                                    )
                                }
                            }


                        )(),
                    ]
                }


                {this.props.auth.loginStatus !== AuthStates.VALID ?
                    <Grid divided centered padded="vertically" columns={3} relaxed='very'>
                        <Grid.Column width={4}>

                            <Header as='h3' textAlign='center'>
                                <Header.Content style={{color: "#009933"}}>UPCOMING EVENTS</Header.Content>
                            </Header>


                            <Card.Group itemsPerRow={1}>
                                {
                                    this.state.eventList.length === 0 ?
                                        <div textAlign={"center"}><Message size={"large"} color={"red"}>No event is
                                            available to
                                            show</Message>
                                        </div> :
                                        this.state.eventList.map((event) =>
                                            <EventsItem
                                                key={event.id}
                                                event={event}
                                            />
                                        )
                                }
                            </Card.Group>

                        </Grid.Column>

                        <Grid.Column width={8}>
                            {this.state.subClub.photoFileName ?
                                <Image centered src={this.state.photo}/> :
                                <Image centered src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                       size='small' circular/>
                            }
                            <Header as='h1' icon textAlign='center'>
                                <Header.Content style={{color: "#702BBA"}}>{this.state.subClub.name.toUpperCase()}
                                    <h4 style={{color: "#000000"}}>{this.state.subClub.category.name}</h4>
                                </Header.Content>
                            </Header>
                            <Divider/>
                            <Header as='h4' icon textAlign='center'>
                                <Header.Content>{this.state.subClub.description}</Header.Content>
                            </Header>

                            <Divider/>


                        </Grid.Column>

                        <Grid.Column width={4} textAlign="justified">
                            <Comment.Group>
                                <Header as='h3' textAlign='center'>
                                    <Header.Content style={{color: "#009933"}}>COMMENTS</Header.Content>
                                </Header>
                                <br/>
                                <Divider/>

                                <CommentList
                                    subClubId={this.state.subClub.id}
                                    subClub={this.state.subClub}
                                />

                            </Comment.Group>
                        </Grid.Column>
                    </Grid> : null
                }
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSubClubInfo: (id, callback) => {
            dispatch(subClubActions.subClubInfoAction(id, callback));
        },
        deleteSubClub: (id, callback) => {
            dispatch(subClubActions.deleteSubClubAction(id, callback));
        },
        createCommentInfo: (data, callback) => {
            dispatch(subClubActions.createCommentAction(data, callback));
        },
        enrollToSubClub: (subClubId, callback) => {
            dispatch(clubActions.enrollToSubClub(subClubId, callback));
        }, getFriendShips: (callback) => {
            dispatch(friendshipActions.getFriendships(callback));
        },
        getUserDetails: (callback) => {
            dispatch(userActions.userInfoAction(callback));
        },
        getSubClubEvents: (subClubId, callback) => {
            dispatch(eventActions.getSubClubEventsAction(subClubId, callback));
        },
        checkEnrolledSubClub: (subClubId, callback) => {
            dispatch(subClubActions.checkEnrolledSubClubAction(subClubId, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubClubInfo))