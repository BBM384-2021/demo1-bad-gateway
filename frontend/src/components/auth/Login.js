import React, {Component} from 'react'
import {withRouter} from "react-router";
import {Button, Segment, Form, Message, Container} from 'semantic-ui-react'
import {connect} from "react-redux";

import * as authActions from "../../api/actions/auth";

import '../../static/css/auth/auth.css'
import {Link} from "react-router-dom";
import Page from "../base/Page";

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            usernameInput: "",
            passwordInput: "",

            isHidden: true,
            isSuccess: false,
            isError: false,

            messageHeader: "",
            messageForm: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleInputChange(event){
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            [event.target.id]: value
        })
    }

    submitFormCallback = (error) => {
        console.log(this.state.usernameInput)
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: error,
            isSuccess: false,
            isError: true,
        })
    };

    submitForm(event){
        event.preventDefault();

        const data = {
            "username": this.state.usernameInput.trim(),
            "password": this.state.passwordInput
        };

        this.props.login(data, this.submitFormCallback);
    }

    render(){
        return(
            <Container className={"auth-container-wrapper"}>
                <div className={"auth-container"}>
                    <Page>
                        <div className={"top-menu-title"}>
                            <h1 className="ui header">LOGIN</h1>
                        </div>
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
                                <Form onSubmit={this.submitForm}>
                                    <Form.Field>
                                        <Form.Input
                                                label={"Username"}
                                            placeholder='username'
                                            value={this.state.usernameInput}
                                            required
                                            id={"usernameInput"}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Form.Input
                                            label={"Password"}
                                            placeholder='********'
                                            type='password'
                                            value={this.state.passwordInput}
                                            required
                                            id={"passwordInput"}
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
                                    <Button type='submit'>LogIn</Button>
                                    <Link to={"/forgot-password"}>
                                        <Button>Forgot Password</Button>
                                    </Link>
                                </Form>
                            </Segment>
                        </Page.Content>
                    </Page>
                </div>
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (data, callback) => {
            dispatch(authActions.loginAction(data, callback))
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

