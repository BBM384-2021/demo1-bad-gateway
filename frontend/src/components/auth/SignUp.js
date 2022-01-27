import React, {Component} from 'react'
import {Redirect, Route, useHistory, withRouter} from "react-router";
import {Button, Segment, Form, Message, Container, Grid, Divider, Icon} from 'semantic-ui-react'
import {connect, ReactReduxContext} from "react-redux";
import * as authActions from "../../api/actions/auth";
import '../../static/css/auth/auth.css'
import '../../static/css/common/Application.css'
import background from '../../static/image/common/bg_4.jpg';
import {Link} from "react-router-dom";
import Login from './Login'


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameInput: "",
            emailInput: "",
            passwordInput: "",
            phoneInput: "",
            nameInput: "",
            passwordRepeat: "",

            isHidden: true,
            isSuccess: false,
            isError: false,

            messageHeader: "",
            messageForm: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleInputChange(event) {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            [event.target.id]: value
        })
    }

    submitFormCallback = (response) => {
        let message = "";
        if (response.success) {
            this.props.history.push(`/questionnarie/answer/${response.userId}`);
        }
        // Backend throws 400 or 500.
        else if(response.response){
            if (response.response.data.status === 400) {
                message = "Please enter a valid email address.";
            }
            else if (response.response.data.status === 500) {
                message = "This username and email exists.";
            }
        }
        // ApiResponse return here.
        else{
            message = response.message;
        }
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: message,
            isSuccess: false,
            isError: true,
        })
    };

    submitForm(event) {
        event.preventDefault();

        const data = {
            "username": this.state.usernameInput.trim(),
            "email": this.state.emailInput,
            "password": this.state.passwordInput,
            "passwordRepeat": this.state.passwordRepeat,
            "name": this.state.nameInput,
            "phone": this.state.phoneInput,
        };
        this.props.signup(data, this.submitFormCallback);
    }


    render() {
        return (
            <div style={{backgroundImage: `url(${background})`, height: "900px"}}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>

                <div style={{paddingTop: "100px", marginLeft: "1000px", opacity: .9, color: '#fff'}}>
                    <h1 className="ui header" style={{color: "black", fontFamily: 'Ubuntu Mono', fontSize: "30px"}}>JOIN
                        US</h1>
                    <Message
                        style={{width: "290px", height: "60px"}}
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
                                width={10}
                                icon='user'
                                iconPosition='left'
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
                                width={10}
                                icon='lock'
                                iconPosition='left'
                                label={"Name/Surname"}
                                placeholder='Name/Surname'
                                value={this.state.nameInput}
                                required
                                id={"nameInput"}
                                onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                width={10}
                                icon='lock'
                                iconPosition='left'
                                label={"Phone"}
                                placeholder='Phone'
                                value={this.state.phoneInput}
                                required
                                id={"phoneInput"}
                                onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                width={10}
                                icon='user'
                                iconPosition='left'
                                label={"Email"}
                                placeholder='email'
                                value={this.state.emailInput}
                                required
                                id={"emailInput"}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                width={10}
                                icon='lock'
                                iconPosition='left'
                                label={"Password"}
                                placeholder='********'
                                type='password'
                                value={this.state.passwordInput}
                                required
                                id={"passwordInput"}
                                onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                width={10}
                                icon='lock'
                                iconPosition='left'
                                label={"Password Confirm"}
                                placeholder='********'
                                type='password'
                                value={this.state.passwordRepeat}
                                required
                                id={"passwordRepeat"}
                                onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Button color='violet' centered type='submit'>Sign Up</Button>
                    </Form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signup: (data, callback) => {
            dispatch(authActions.signupAction(data, callback))
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));

