import React, {Component} from 'react'
import {withRouter} from "react-router";
import {Button, Segment, Form, Message, Container, Grid, Divider, Icon, Header} from 'semantic-ui-react'
import {connect} from "react-redux";

import * as authActions from "../../api/actions/auth";
import '../../static/css/auth/auth.css'
import {Link} from "react-router-dom";
import Page from "../base/Page";
import logo from "../../static/image/common/logo.png";
import people from '../../static/image/common/people.webp';
import slide1 from '../../static/image/common/backpackers.jpg';
import slide2 from '../../static/image/common/beach.jpg';
import slide3 from '../../static/image/common/bg_4.jpg';
import  Carousel  from  'semantic-ui-carousel-react';


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
        let  elements  = [
            {
                render:()=>{
                    return <img src={slide1}  width={"100%"} alt={"SpiritsUp"}/>
                }
            },
            {
                render:()=>{
                    return <img src={slide2} width={"100%"} alt={"SpiritsUp"}/>
                }
            },

        ]

        return(
            <React.Fragment>
                <Carousel
                    background-color = "#EFF8F9"
                    elements  =  {  elements  }
                    duration  = {5000}
                    animation  ='slide left'
                    showNextPrev  =  {false}
                />
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
                        <Segment className={"loginBox"} color='violet'>
                            <Header className={"loginHeader"} size={"huge"} textAlign={"center"}>LOGIN</Header>

                            <Form onSubmit={this.submitForm}>
                                <Form.Field>
                                    <Form.Input
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
                                <Button color='violet' type='submit'>LogIn</Button>
                                <Link to={"/forgot-password"}>
                                    <Button color='twitter'>Forgot Password</Button>
                                </Link>
                                <Divider />
                                <Container textAlign={"center"}>
                                    <text>If you don't have an account yet  </text>
                                    <Link to={"/signup"} style={{color: "#702BBA"}}>
                                        Sign Up
                                    </Link>
                                </Container>
                            </Form>
                        </Segment>
                    </Page.Content>
                </Page>
            </React.Fragment>
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

