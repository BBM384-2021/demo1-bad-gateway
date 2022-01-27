import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import {
    Button,
    Form,
    Loader,
    Segment,
    Grid,
    Message,
    Card,
    Dropdown,
    Select
} from 'semantic-ui-react';
import * as eventActions from "../../api/actions/event";
import Page from "../base/Page";
import {Link} from 'react-router-dom';
import {getRoles} from "../../utils/auth";
import EventsItem from "./EventsItem";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ClubSelect from "../club/ClubSelect";
import SubClubSelect from "../subClub/SubClubSelect";

class Events extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        filters: {
            name: "",
            eventType: "",
            beforeEventDate: "",
            afterEventDate: "",
            clubId: "",
            subClubId: "",
        },
    };

    constructor(props) {
        super(props);
        this.handleEventList = this.handleEventList.bind(this);
    }

    componentDidMount() {
        this.props.getEventsList(0, this.state.filters.name, this.state.filters.eventType, this.state.filters.beforeEventDate,
            this.state.filters.afterEventDate, this.state.clubId, this.state.subClubId, this.handleEventList);
    }

    handleEventList(data) {
        this.setState({
            eventList: data.content,
            status: LoadingStates.LOADED
        })
    }

    handleFiltering = (event) => {
        this.props.getEventsList(0, this.state.filters.name, this.state.filters.eventType, this.state.filters.beforeEventDate,
            this.state.filters.afterEventDate, this.state.clubId, this.state.subClubId, this.handleEventList);
    };


    handleInputChange = (event) => {
        console.log(event.target.value);
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            filters: {
                ...this.state.filters,
                [event.target.id]: value
            }
        })

    };


    handleEventTypeFilterChange = (e, {value}) => this.setState({
        filters: {
            ...this.state.filters,
            eventType: value
        }
    });

    handleEventDateFilterChange = (event, data) => {
        event.preventDefault();
        if (!data.value) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    beforeEventDate: "",
                    afterEventDate: "",
                }
            })
        } else if (data.value[0] && data.value[1]) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    beforeEventDate: data.value[0].toISOString(),
                    afterEventDate: data.value[1].toISOString(),
                }
            })
        } else if (data.value[0]) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    beforeEventDate: data.value[0].toISOString(),
                }
            })
        } else if (data.value[1]) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    afterEventDate: data.value[1].toISOString(),
                }
            })
        }
    };


    handleClubFilterChange = (value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                clubId: value.id,
                subClubId: null,
            }
        })
    };

    handleSubClubFilterChange = (value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                subClubId: value.id,
            }
        })
    };

    render() {

        const {status} = this.state;
        let roles = getRoles();

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
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>
                    <Page.Header.Item><p style={{color: "black", fontFamily: 'Ubuntu Mono ', fontSize: "30px"}}>Upcoming
                        Events</p></Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Filter>
                        <Form onSubmit={this.handleFiltering}>
                            <Form.Group>
                                <Form.Field>
                                    <Form.Input id={"name"}
                                                placeholder='Event Name'
                                                value={this.state.filters.name}
                                                onChange={this.handleInputChange}
                                                inline
                                    />
                                </Form.Field>
                                <Form.Input id={"eventType"}
                                            placeholder='Event Type'
                                            value={this.state.filters.status}
                                            onChange={this.handleEventTypeFilterChange}
                                            control={Select}
                                            options={
                                                [
                                                    {key: 'ONLINE', value: 'ONLINE', text: 'ONLINE'},
                                                    {key: 'OFFLINE', value: 'OFFLINE', text: 'OFFLINE'}
                                                ]
                                            }
                                />
                                <ClubSelect
                                    hasEmptyLine={true}
                                    stateChangeCallback={this.handleClubFilterChange}
                                />
                                {this.state.filters.clubId !== null &&
                                <SubClubSelect
                                    clubId={this.state.filters.clubId}
                                    hasEmptyLine={true}
                                    stateChangeCallback={this.handleSubClubFilterChange}
                                />
                                }
                                <SemanticDatepicker
                                    id={"approvalDate"}
                                    placeholder="Event Date"
                                    onChange={this.handleEventDateFilterChange}
                                    type="range"
                                    keepOpenOnClear="true"
                                />
                                <Form.Button content='Search'/>
                            </Form.Group>

                        </Form>
                    </Page.Operation.Filter>
                </Page.Operation>
                <Page.Content>
                    <Segment>
                        {roles ? roles.find((item) => item === "ADMIN") && <div>
                            <Grid columns='equal'>
                                <Grid.Row>
                                    <Grid.Column/>
                                    <Grid.Column/>
                                    <Grid.Column textAlign={'right'}>
                                        <Button positive as={Link} to={"/event/create"}>
                                            Create Event
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid></div> : null
                        }

                        <Card.Group itemsPerRow={3}>
                            {
                                this.state.eventList.length === 0 ?
                                    <div  textAlign={"center"}><Message size={"large"} color={"red"}>No event is available to
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
                        </Card.Group>

                    </Segment>
                </Page.Content>


            </Page>
        )


    }

}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getEventsList: (page, name, eventType, beforeEventDate, afterEventDate, clubId, subClubId, callback) => {
            dispatch(eventActions.eventListAction(page, name, eventType, beforeEventDate, afterEventDate, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);