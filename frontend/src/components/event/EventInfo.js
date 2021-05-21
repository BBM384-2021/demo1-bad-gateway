import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LoadingStates} from "../../constants/common";
import Page from "../base/Page";
import {Link} from "react-router-dom";
import {getRoles} from "../../utils/auth";
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Loader,
} from "semantic-ui-react";
import * as eventActions from "../../api/actions/event";



class EventInfo extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        event: {},
        roles:[]
    };

    constructor(props) {
        super(props);
        this.handleEventInfo = this.handleEventInfo.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
    }



    componentDidMount() {
        const {id} = this.props.match.params;
        const {auth} = this.props;
        this.props.getEventInfo(id, this.handleEventInfo);
    }

    handleEventInfo(data) {
        let roles = getRoles();
        this.setState({
                event: data,
                status: LoadingStates.LOADED,
                roles:roles
            }
        )
    }

    handleDeleteInfo(data){
        console.log(data);
    }

    sendDeleteRequest(){
        this.props.deleteEvent(this.state.event.id, this.handleDeleteInfo);
    }


    render() {

        const {status,roles} = this.state;
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

                {roles ? roles.find((item)=> item==="ADMIN") && <div style={{display:"flex",justifyContent:"flex-end",paddingBottom:"2rem"}}>
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
                    <Grid.Column width={8}>
                        {auth && console.log(auth.roles)}
                        <Header as='h2' icon textAlign='center' color="violet">
                            <Icon name='users' circular/>
                            <Header.Content>{this.state.event.name}</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center' sub>
                            <Header.Content>Category</Header.Content>
                        </Header>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>{this.state.event.address}</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center' sub>
                            <Header.Content>Status</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center'>
                            <Header.Content>{this.state.event.club.name}</Header.Content>
                        </Header>
                        <Divider/>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content><a><Icon name='user' color="violet"/> {this.state.event.attendees.length} Attendee
                            </a></Header.Content>
                        </Header>
                        <Button basic color='violet' fluid>
                            Join the Event
                        </Button>

                    </Grid.Column>
                    {this.state.event.subClub !== null &&
                    <Grid.Column width={4} textAlign="justified">
                        <Header as='h2' icon textAlign='center' >
                            <Header.Content>Description</Header.Content>
                            <Divider/>
                        </Header>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>{this.state.event.subClub.name}</Header.Content>
                        </Header>
                    </Grid.Column>
                    }

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
    }
};

const mapStateToProps = (state, ownProps) => {

    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventInfo))