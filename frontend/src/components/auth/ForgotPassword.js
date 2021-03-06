import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Button, Segment, Form, Message} from "semantic-ui-react";
import * as authActions from "../../api/actions/auth";
import Page from "../base/Page";


class ForgotPassword extends Component {
    state = {
        field: {
            email:"",
        },

        isHidden: true,
        isSuccess: false,
        isError: false,
        messageHeader: "",
        messageForm: "",
    };

    constructor(props){
        super(props);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
    }

    handleForgotPassword(data) {
        this.setState({
            field: data,
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            field: {
                ...this.state.field,
                [event.target.id]: value
            }
        })
    };

    submitFormCallback = (error) => {
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: error.message,
            isSuccess: error.success,
            isError: true,
        })
        if(error.success){
            this.setState({
                messageForm: "Mail sent successfully. Please check your email.",
            })
        }
    };

    onFormSubmit = () => {
        this.setState({
            isFormSubmitting: false,
            submitStatus: true,
        });

        let data = {
            "email": this.state.field.email,
        };

        this.props.forgotPassword(data, this.submitFormCallback);
    };

    render() {
        return (
        <Page>
            <Page.Header>
                <Page.Header.Item>Auth</Page.Header.Item>
                <Page.Header.Item>Forgot Password</Page.Header.Item>
            </Page.Header>
            <Page.Content>
                <Segment>
                    <Message
                        hidden={this.state.isHidden}
                        success={this.state.isSuccess}
                        error={this.state.isError}
                        header={this.state.messageHeader}
                        content={this.state.messageForm}
                        className={"message-auth"}
                    />
                    <div>You can create a new password from the mail that you registered the system.</div><br/>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Field>
                            <Form.Input
                                id={"email"}
                                label={"E-mail"}
                                placeholder='example@mail.com'
                                value={this.state.field.email}
                                required
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Button type='submit'>Send mail</Button>
                    </Form>
                </Segment>
            </Page.Content>
        </Page>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        forgotPassword: (data, callback) => {
            dispatch(authActions.forgotPasswordAction(data, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));