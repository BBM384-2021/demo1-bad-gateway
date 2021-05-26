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
        eventList: []
    };

    constructor(props) {
        super(props);
        this.handleSubClubInfo = this.handleSubClubInfo.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
        this.handleEventList = this.handleEventList.bind(this);
        this.handleCommentCreate = this.handleCommentCreate.bind(this);
        this.loadImage = this.loadImage.bind(this);

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {auth} = this.props;
        this.props.getSubClubInfo(id, this.handleSubClubInfo);
        this.props.getSubClubEvents(id, this.handleEventList);
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
                    (this.props.auth.loginStatus === AuthStates.VALID && (!(this.state.subClub.name in this.props.auth.bans))) &&
                    [
                        (() => {
                                if (roles.find((item) => (item === "ADMIN" || item === "SUB_CLUB_ADMIN")))

                                    return (
                                        <React.Fragment>
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

                                            </div>
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
                                                        </Header.Content>
                                                    </Header>
                                                    <Divider/>
                                                    <Header as='h4' icon textAlign='center'>
                                                        <Header.Content>{this.state.subClub.description}</Header.Content>
                                                    </Header>

                                                    <Divider/>


                                                    {
                                                        this.props.auth.loginStatus === AuthStates.VALID ?
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
        getSubClubEvents: (subClubId, callback) => {
            dispatch(eventActions.getSubClubEventsAction(subClubId, callback));
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubClubInfo))