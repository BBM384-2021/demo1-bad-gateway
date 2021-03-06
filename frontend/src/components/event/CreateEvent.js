import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import {Button, Form, Select, Segment, Header, Message} from "semantic-ui-react";
import * as eventActions from "../../api/actions/event";
import ClubSelect from "../club/ClubSelect";
import SubClubSelect from "../subClub/SubClubSelect";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';


class CreateEvent extends Component {

    state = {
        isHidden: true,
        isSuccess: false,
        isError: false,

        messageHeader: "",
        messageForm: "",

        data: {
            name: "",
            address: "",
            description: "",
            eventType: "",
            clubId: "",
            subClubId: "",
            eventDateCreate: ""
        }
    };

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.submitFormCallback = this.submitFormCallback.bind(this);
    }


    handleClubInputChange = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                clubId: value.id,
                subClubId: null,
            }
        })
    };

    handleEventTypeInputChange = (e, {value}) => this.setState({
        data: {
            ...this.state.data,
            eventType: value
        }
    });

    handleSubClubInputChange = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                subClubId: value.id,
            }
        })
    };

    handleEventDateInputChange = (event, {name, value}) => {

            this.setState({
                data: {
                    ...this.state.data,
                    eventDateCreate: value
                }
            })


    }


    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            data: {
                ...this.state.data,
                [event.target.id]: value
            }
        })

    };


    submitFormCallback(response) {
        this.setState({
            isHidden: false,
            messageHeader: "Event Created",
            messageForm: response,
            isSuccess: true,
            isError: false,
        })
        setTimeout(() => {
            this.props.history.push("/event/list");
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault();

        const {clubId} = this.state.data;
        if (clubId === "") {
            this.setState({
                isError: true,
                isHidden: false,
                isSuccess: false,
                messageHeader: "Missing Data: Club must be selected!",
                messageFrom: "Club must be selected!"
            })
            return;
        }

        this.props.createEvent(this.state.data, this.submitFormCallback);

    }


    render() {

        return (
            <Page>
                <Page.Content>
                    <Message
                        hidden={this.state.isHidden}
                        success={this.state.isSuccess}
                        error={this.state.isError}
                        header={this.state.messageHeader}
                        content={this.state.messageForm}
                        className={"message-auth"}
                    />
                    <Segment>
                        <Header className={"loginHeader"} size={"large"}>Create Event</Header>
                        <Form onSubmit={this.submitForm}>
                            <Form.Field>
                                <Form.Input
                                    label={"Name"}
                                    placeholder='Event Name'
                                    value={this.state.data.name}
                                    required
                                    id={"name"}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label={"Address"}
                                    placeholder='Address'
                                    type='text'
                                    value={this.state.data.address}
                                    required
                                    id={"address"}
                                    onChange={this.handleInputChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label={"Description"}
                                    placeholder='Description'
                                    type='text'
                                    value={this.state.data.description}
                                    required
                                    id={"description"}
                                    onChange={this.handleInputChange}/>
                            </Form.Field>
                            <p>Club *</p>
                            <Form.Field>
                                <ClubSelect
                                    hasEmptyLine={true}
                                    stateChangeCallback={this.handleClubInputChange}
                                />
                            </Form.Field>
                            <p>Sub Club</p>
                            {this.state.data.clubId !== null &&
                                <Form.Field>
                                    <SubClubSelect
                                        clubId={this.state.data.clubId}
                                        hasEmptyLine={true}
                                        stateChangeCallback={this.handleSubClubInputChange}
                                    />
                                </Form.Field>
                            }
                            <p>Event Type *</p>
                            <Form.Field>
                                <Form.Input id={"eventType"}
                                            placeholder='Event Type'
                                            value={this.state.data.eventType}
                                            onChange={this.handleEventTypeInputChange}
                                            required
                                            control={Select}
                                            options={
                                                [
                                                    {key: 'ONLINE', value: 'ONLINE', text: 'ONLINE'},
                                                    {key: 'OFFLINE', value: 'OFFLINE', text: 'OFFLINE'}
                                                ]
                                            }
                                />
                            </Form.Field>
                            <p>Event Date *</p>
                            <Form.Field>
                                <DateTimeInput
                                    name="dateTime"
                                    placeholder="Date Time"
                                    value={this.state.data.eventDateCreate}
                                    iconPosition="left"
                                    required
                                    onChange={this.handleEventDateInputChange}
                                />
                            </Form.Field>

                            <Button color='violet' type='submit'>Submit</Button>
                        </Form>
                    </Segment>
                </Page.Content>
            </Page>
        )


    }


}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createEvent: (data, callback) => {
            dispatch(eventActions.eventCreateAction(data, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {

    return {}
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent))