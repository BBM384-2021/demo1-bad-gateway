import React, {Component} from 'react';
import {Button, Icon, Table, Card, Image, Feed} from 'semantic-ui-react';
import '../../static/css/common/Application.css'
import {Link} from 'react-router-dom';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import * as eventActions from "../../api/actions/event";
import {withRouter} from "react-router";
import {connect} from "react-redux";



class EventsItem extends Component {

    state = {
        isAttendee : false,
        event : {
            name: "",
            address: "",
            description: "",
            eventType: "",
            club: "",
            subClub: "",
            attendees: "",
            clubId: "",
            subClubId: "",
            eventDate: ""
        }
    }

    constructor(props) {
        super(props);
        this.handleAttendButton = this.handleAttendButton.bind(this);
        this.handleLeaveButton = this.handleLeaveButton.bind(this);
        this.handleAttendCallback = this.handleAttendCallback.bind(this);
        this.handleDeleteAttendeeCallback = this.handleDeleteAttendeeCallback.bind(this);
    }

    componentDidMount() {
        const {event, auth} = this.props;

        let isAttendee = event.attendees.some(atd => atd.username === auth.username);

        this.setState({
            isAttendee : isAttendee,
            event : event
        })

    }


    handleAttendCallback(data){
        this.setState({
           isAttendee : true,
            event : data
        });
    }

    handleDeleteAttendeeCallback(data){
        this.setState({
            isAttendee : false,
            event : data
        });
    }

    handleAttendButton() {
        const {event} = this.props;
        this.props.attendEvent(event.id, this.handleAttendCallback);
    }

    handleLeaveButton() {
        const {event} = this.props;
        this.props.deleteAttendeeEvent(event.id, this.handleDeleteAttendeeCallback);
    }


    render() {


        //let eventDate = event.eventDate.toISOString();

        return (
            <Card style={{"word-wrap": "break-word"}} color="orange">

                <Card.Content>
                    <Card.Header>
                        <Link to={"/event/info/" + this.state.event.id}>
                            {this.state.event.name}
                        </Link>
                    </Card.Header>
                    {this.state.event.subClub === null &&
                    <Card.Meta>
                        by {this.state.event.club.name}
                    </Card.Meta>
                    }
                    {this.state.event.subClub !== null &&
                    <Card.Meta>
                        by {this.state.event.subClub.name}
                    </Card.Meta>
                    }

                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <Icon name="calendar alternate"/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    {this.state.event.eventDate}
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

                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        {this.state.event.attendees.length} Attendees
                    </a>
                    {this.state.isAttendee === false && <Button size={"tiny"} compact={"true"} style={{marginLeft: "400px"}} onClick={this.handleAttendButton}>
                        Attend
                    </Button>
                    }
                    {this.state.isAttendee && <Button size={"tiny"} compact={"true"} style={{marginLeft: "400px"}} onClick={this.handleLeaveButton}>
                        Leave
                    </Button>
                    }

                </Card.Content>
            </Card>


        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsItem))