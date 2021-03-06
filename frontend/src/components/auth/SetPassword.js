import React, {Component} from 'react'
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router";
import {Button, Container, Divider, Form, Grid, Header, Icon, List, Loader, Message} from "semantic-ui-react";
import * as authActions from "../../api/actions/auth";
import {LoadingStates} from "../../constants/common";
import {checkPassword} from "../../utils/auth";
import {Link} from "react-router-dom";
import Page from "../base/Page";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";

class SetPassword extends Component {
    constructor(props){
        super(props);

        this.state = {
            tokenStatus:{
                success: null,
                message: "",
            },

            passwordInput: "",
            passwordInputRepeat: "",

            isHidden: true,
            isSuccess: false,
            isError: false,

            messageHeader: "",
            messageForm: "",

            buttonDisabled: true,
        };

        this.handleSetPassword = this.handleSetPassword.bind(this);
        this.handleBadToken = this.handleBadToken.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    passwordRules = [
        {
            title: "Your password must be at least 8 characters.",
            rule: (val)=>val.length>=8
        },
        {
            title: "Your password must contain at least 1 number.",
            rule: (val)=>val.match(".*\\d.*")
        },
        {
            title: "Your password must contain at least 1 character.",
            rule: (val)=>val.match(".*[a-zA-Z].*")
        },
        {
            title: "Your password must contain &lt; &gt; ' ( ) \" special characters.",
            rule: (val)=>!val.match(".*[<>'()\"].*")
        },
    ];

    componentDidMount() {
        const {token} = this.props.match.params;
        this.props.checkToken(token, this.handleSetPassword, this.handleBadToken);
    }

    handleBadToken() {
        this.setState({
            passwordInput: '',
            passwordInputRepeat: '',
            isHidden: false,
            messageHeader: "",
            messageForm: "Your confirmation code is wrong, please try again.",
            isSuccess: false,
            isError: true,
        })
        this.props.history.push('/')
    }

    handleSetPassword(data) {
        this.setState({
            tokenStatus: data,
            status: LoadingStates.LOADED
        })
    }

    submitFormCallback = (error) => {
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: "Your password has changed succesfully.",
            isSuccess: true,
            isError: false,
        })
    };

    handleInputChange(event){
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            [event.target.id]: value
        });
    }

    onFormSubmit = () => {
        if(checkPassword(this.state.passwordInput)){
            let data = {
                "password": this.state.passwordInput,
                "passwordAgain": this.state.passwordInputRepeat,
            };

            const {token} = this.props.match.params;
            this.props.setPassword(data, token, this.submitFormCallback);

            setTimeout(() => this.props.history.push('/'), 1500);
        }
        else{
            this.setState({
                isHidden: false,
                messageHeader: "",
                messageForm: "Plase create a password with at least one letter, one number and one character with he length of 8 characters.",
                isSuccess: false,
                isError: true,
            })
        }
    }


    render() {

        let repeatsMatch = this.state.passwordInput === this.state.passwordInputRepeat;
        let buttonEnabled = true;

        const {status} = this.state;

        if(this.state.passwordInput === this.state.passwordInputRepeat){
            this.passwordRules.forEach((rule)=>{
                buttonEnabled = buttonEnabled && rule.rule(this.state.passwordInput);
            });
        } else {
            buttonEnabled = false;
        }

        const ruleIcon = (rule, value) => {
            if (rule(value)){
                return (<List.Icon color={"green"} name={"checkmark"}/>);
            }
            return (<List.Icon color={"red"} name={"cancel"}/>);
        };

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>Login</Page.Header.Item>
                    <Page.Header.Item>Forgot Password</Page.Header.Item>
                    <Page.Header.Item>Set Password</Page.Header.Item>

                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} onClick={this.onFormSubmit} disabled={!buttonEnabled}>
                            <Icon name='save' color={"blue"}/>
                            Save
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>
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
                        {
                            this.state.tokenStatus.success === true &&
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <Form onSubmit={this.onFormSubmit}>
                                        <Form.Field>
                                            <Form.Input
                                                label={"New Password"}
                                                placeholder='********'
                                                type='password'
                                                value={this.state.passwordInput}
                                                required
                                                id={"passwordInput"}
                                                max={100}
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input
                                                label={"New Password Again"}
                                                placeholder='********'
                                                type='password'
                                                value={this.state.passwordInputRepeat}
                                                required
                                                id={"passwordInputRepeat"}
                                                max={100}
                                                error={!repeatsMatch}
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column verticalAlign={"bottom"}>
                                    <Message size={"large"}>
                                        <List>
                                            <List.Item>
                                                {ruleIcon(()=>this.state.passwordInput.length>0, this.state.passwordInput)}
                                                <List.Content>
                                                    Current Password should not be empty.
                                                </List.Content>
                                            </List.Item>
                                            <Divider/>
                                            {this.passwordRules.map((rule) =>
                                                <List.Item>
                                                    {ruleIcon(rule.rule, this.state.passwordInput)}
                                                    <List.Content>
                                                        {rule.title}
                                                    </List.Content>
                                                </List.Item>
                                            )}
                                            <Divider/>
                                            <List.Item>
                                                {ruleIcon((val)=>val===this.state.passwordInputRepeat, this.state.passwordInput)}
                                                <List.Content>
                                                    Passwords should match.
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    </Message>
                                </Grid.Column>
                            </Grid>
                        }
                        {
                            this.state.tokenStatus.message === "The request timed out." &&
                            <Grid>
                                <Grid.Column width={8}>
                                    <Segment><h4>
                                        Your password request has been timed out. Please request again by using "Forgot Password" link.
                                    </h4></Segment>
                                    <br/>
                                    <Button icon as={ Link } to={'/auth/forgot-password'}>
                                        Forgot Password
                                    </Button>
                                </Grid.Column>

                            </Grid>

                        }
                    </Segment>
                </Page.Content>
            </Page>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkToken: (token, callback, errorCallback) => {
            dispatch(authActions.checkTokenAction(token, callback, errorCallback));
        },
        setPassword: (data, currentLocation, callback) => {
            dispatch(authActions.setPasswordAction(data, currentLocation, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;
    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPassword));



