import React, {Component} from 'react'
import {Button, Container, Divider, Form, Grid, Header, Icon, List, Message} from 'semantic-ui-react'
import {connect} from "react-redux";
import {checkPassword} from "../../utils/auth";

import * as authActions from "../../api/actions/auth";
import {Link} from "react-router-dom";
import {Redirect, Route} from "react-router";
import Page from "../base/Page";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";

class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: "",
            passwordInput: "",
            passwordInputRepeat: "",

            isHidden: true,
            isSuccess: false,
            isError: false,

            messageHeader: "",
            messageForm: "",

            buttonDisabled: true,
            loginButtonDisabled: true
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    passwordRules = [
        {
            title: "Şifreniz en az 8 karakter olmalıdır.",
            rule: (val) => val.length >= 8
        },
        {
            title: "Şifreniz en az 1 rakam içermelidir.",
            rule: (val) => val.match(".*\\d.*")
        },
        {
            title: "Şifreniz en az 1 karakter içermelidir.",
            rule: (val) => val.match(".*[a-zA-Z].*")
        },
        {
            title: "Şifreniz &lt; &gt; ' ( ) \" özel karakterlerini içermemelidir.",
            rule: (val) => !val.match(".*[<>'()\"].*")
        },
    ];

    handleInputChange(event) {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            [event.target.id]: value
        });
    }

    submitFormCallback = (error) => {
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: error.message,
            isSuccess: error.success,
            isError: true,
        })
        if (error.success) {
            return <Route render={() => <Redirect to={{pathname: ""}}/>}/>
        }
    };

    submitForm(event) {
        event.preventDefault();
        if (checkPassword(this.state.passwordInput)) {
            const data = {
                "currentPassword": this.state.currentPassword,
                "newPassword": this.state.passwordInput,
                "newPasswordRepeat": this.state.passwordInputRepeat
            };
            this.props.resetPassword(data, this.submitFormCallback);
        } else {
            this.setState({
                isHidden: false,
                messageHeader: "",
                messageForm: "Lütfen en az 1 harf 1 rakam ve 1 karakter içeren 8 karakterli şifre oluşturunuz.",
                isSuccess: false,
                isError: true,
            })
        }
    }

    render() {

        if(!this.props.auth.passwordReset){
            return <Route render={() => <Redirect to={{pathname: ""}}/>}/>
        }

        let repeatsMatch = this.state.passwordInput === this.state.passwordInputRepeat;
        let buttonEnabled = true;

        if (this.state.currentPassword.length > 0 && this.state.passwordInput === this.state.passwordInputRepeat) {
            this.passwordRules.forEach((rule) => {
                buttonEnabled = buttonEnabled && rule.rule(this.state.passwordInput);
            });
        } else {
            buttonEnabled = false;
        }

        const ruleIcon = (rule, value) => {
            if (rule(value)) {
                return (<List.Icon color={"green"} name={"checkmark"}/>);
            }
            return (<List.Icon color={"red"} name={"cancel"}/>);
        };

        return (

            <Page>
                <Page.Header>
                    <Page.Header.Item>Profil</Page.Header.Item>
                    <Page.Header.Item>Şifre Sıfırla</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} onClick={this.submitForm} disabled={!buttonEnabled}>
                            <Icon name='save' color={"blue"}/>
                            Kaydet
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
                        <Grid columns='equal'>
                            <Grid.Column>
                                <Form onSubmit={this.submitForm}>
                                    <Form.Field>
                                        <Form.Input
                                            label={"Mevcut Şifre"}
                                            placeholder='Mevcut şifrenizi giriniz.'
                                            type='password'
                                            value={this.state.currentPassword}
                                            required
                                            id={"currentPassword"}
                                            max={100}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            label={"Yeni Şifre"}
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
                                            label={"Yeni Şifre Tekrar"}
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
                                            {ruleIcon(() => this.state.currentPassword.length > 0, this.state.passwordInput)}
                                            <List.Content>
                                                Mevcut Şifre boş olmamalıdır.
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
                                            {ruleIcon((val) => val === this.state.passwordInputRepeat, this.state.passwordInput)}
                                            <List.Content>
                                                Şifre ve tekrarı aynı olmalıdır.
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Page.Content>
            </Page>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetPassword: (data, callback) => {
            dispatch(authActions.resetPasswordAction(data, callback))
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);

