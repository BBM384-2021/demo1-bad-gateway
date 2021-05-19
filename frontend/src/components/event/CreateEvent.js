import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from "react";
import '../../static/css/auth/auth.css'
import Page from "../base/Page";
import {Button, Container, Divider, Form, Select, Dropdown, Segment, Header, Message} from "semantic-ui-react";
import {LoadingStates} from "../../constants/common";
import * as eventActions from "../../api/actions/event";


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
            eventType: "",
            clubId: "",
            subClubId: "",
            eventDate: ""
        }
    };


    handleEventTypeInputChange = (e, {value}) => this.setState({
        data: {
            ...this.state.data,
            eventType: value
        }
    });

    handleClubInputChange = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                clubId: value.id,
                subClubId: null,
            }
        })
    };

    handleSubClubInputChange = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                subClubId: value.id,
            }
        })
    };

    handleEventDateFilterChange = (event, data) => {
        event.preventDefault();
        if (!data.value) {
            this.setState({
                data: {
                    ...this.state.data,
                    eventDate: "",
                }
            })
        } else if (data.value[0] && data.value[1]) {
            this.setState({
                data: {
                    ...this.state.data,
                    eventDate: data.value[0].toISOString(),
                }
            })
        }
    };


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


    submitFormCallBack(response) {
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
        console.log(clubId);
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