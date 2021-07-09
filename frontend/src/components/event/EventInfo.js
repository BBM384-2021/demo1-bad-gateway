import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LoadingStates} from "../../constants/common";
import Page from "../base/Page";
import {Link} from "react-router-dom";
import {getRoles} from "../../utils/auth";
import {
    Button, Card,
    Divider, Feed,
    Grid,
    Header,
    Icon,
    Image,
    Loader,
} from "semantic-ui-react";
import * as eventActions from "../../api/actions/event";
import {dateParser, timeParser} from "../../utils/time";


class EventInfo extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        isAttendee: false,
        event: {},
        roles: []
    };

    constructor(props) {
        super(props);
        this.handleEventInfo = this.handleEventInfo.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
        this.handleAttendButton = this.handleAttendButton.bind(this);
        this.handleLeaveButton = this.handleLeaveButton.bind(this);
        this.handleAttendCallback = this.handleAttendCallback.bind(this);
        this.handleDeleteAttendeeCallback = this.handleDeleteAttendeeCallback.bind(this);
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getEventInfo(id, this.handleEventInfo);
    }

    handleAttendCallback(data) {
        this.setState({
            isAttendee: true,
            event: data
        });
    }

    handleDeleteAttendeeCallback(data) {
        this.setState({
            isAttendee: false,
            event: data
        });
    }

    handleAttendButton() {
        this.props.attendEvent(this.state.event.id, this.handleAttendCallback);
    }

    handleLeaveButton() {
        this.props.deleteAttendeeEvent(this.state.event.id, this.handleDeleteAttendeeCallback);
    }

    handleEventInfo(data) {
        let roles = getRoles();
        const {auth} = this.props;
        let isAttendee = data.attendees.some(atd => atd.username === auth.username);
        this.setState({
                isAttendee: isAttendee,
                event: data,
                status: LoadingStates.LOADED,
                roles: roles
            }
        )
    }

    handleDeleteInfo(data) {
        console.log(data);
    }

    sendDeleteRequest() {
        this.props.deleteEvent(this.state.event.id, this.handleDeleteInfo);
    }


    render() {

        const {status, roles} = this.state;
        const {eventDate} = this.state.event;
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

                {roles ? roles.find((item) => item === "ADMIN") &&
                    <div style={{display: "flex", justifyContent: "flex-end", paddingBottom: "2rem"}}>
                        <Link to={`/event/update/${this.state.event.id}`} style={{color: "#702BBA"}}>
                            <Button primary>
                                Update Event
                            </Button>
                        </Link>
                        <Button basic color='red' onClick={this.sendDeleteRequest}>
                            Delete Event
                        </Button>

                    </div> : null}


                <Grid divided centered padded="vertically">

                    <Grid.Column width={5}>
                        {auth && console.log(auth.roles)}
                        <Header as='h2' icon textAlign='center' color="violet">
                            <Icon name='users' circular/>
                            <Header.Content>{this.state.event.name}</Header.Content>
                        </Header>
                        {this.state.event.subClub === null &&
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>Organised by {this.state.event.club.name}</Header.Content>
                        </Header>
                        }
                        {this.state.event.subClub !== null &&
                        <Header as='h4' icon textAlign='center' sub>
                            <Header.Content>This event organised by {this.state.event.subClub.name}</Header.Content>
                        </Header>
                        }
                        <Divider/>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>{this.state.event.description}</Header.Content>
                        </Header>
                        <Divider/>
                        {this.state.isAttendee === false &&
                        <Button basic color='violet' size={"medium"} fluid onClick={this.handleAttendButton}>
                            Attend
                        </Button>
                        }
                        {this.state.isAttendee &&
                        <Button basic color='violet' size={"medium"} fluid onClick={this.handleLeaveButton}>
                            Leave
                        </Button>
                        }


                    </Grid.Column>
                    <Grid.Column width={4} textAlign="justified">
                        <Card color={"violet"}>
                            <Card.Content>
                                <Card.Header>Event Details</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name="calendar alternate"/>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                {dateParser(eventDate)}
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name="clock"/>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                {timeParser(eventDate)}
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name="map marker alternate"/>
                                        </Feed.Label>

                                        <Feed.Content>
                                            {this.state.event.eventType === "ONLINE" &&
                                            <Feed.Summary>
                                                <a href={this.state.event.address}
                                                   target={"_blank"}>{this.state.event.address}</a>
                                            </Feed.Summary>
                                            }
                                            {this.state.event.eventType === "OFFLINE" &&
                                            <Feed.Summary>
                                                <a href={"https://www.google.com.tr/maps/search/" + this.state.event.address}
                                                   target={"_blank"}>{this.state.event.address}</a>
                                            </Feed.Summary>
                                            }
                                        </Feed.Content>
                                    </Feed.Event>
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name="user circle"/>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                {this.state.event.attendees.length} Attendees
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Page>


        )


    }


}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getEventInfo: (id, callback) => {
            dispatch(eventActions.eventInfoAction(id, callback));
        },
        deleteEvent: (id, callback) => {
            dispatch(eventActions.eventDeleteAction(id, callback));
        },
        attendEvent: (eventId, callback) => {
            dispatch(eventActions.attendEventAction(eventId, callback));
        },
        deleteAttendeeEvent: (eventId, callback) => {
            dispatch(eventActions.deleteAttendeeAction(eventId, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventInfo))