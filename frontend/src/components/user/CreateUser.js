import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Button, Icon, Segment, Form, Select, Message} from "semantic-ui-react";
import * as userActions from "../../api/actions/user";
import {connect} from "react-redux";
import Page from "../base/Page";
import userStatus from "../../constants/common/userStatus";


class CreateUser extends Component {

    state = {
        userInfo: {
            id: null,
            name: "",
            username: "",
            phone: "",
            email: "",
            password: "",
            status: "",
            roles:[]
        },
        submitStatus: null,
    };

    constructor(props) {
        super(props);
    }


    handleSubmitCallback(data) {
        this.setState({
            submitStatus: true,
        });
    }

    handleStatusChange = (e, { value }) => this.setState({
        userInfo: {
            ...this.state.userInfo,
            status: value
        }
    });

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";
        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [event.target.id]: value
            }
        })
    }

    handleSubmit = (event) => {
        this.props.createUser(this.state.userInfo, this.handleSubmitCallback);
    }


    render() {

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>User</Page.Header.Item>
                    <Page.Header.Item>New</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} onClick={this.handleSubmit}>
                            <Icon name='save' color={"blue"}/>
                            Save
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>
                <Page.Content>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths={"equal"}>
                                <Form.Input id={"name"}
                                            placeholder='Ad'
                                            label='Ad'
                                            value={this.state.userInfo.name}
                                            onChange={this.handleInputChange}
                                            maxLength="40"
                                            required
                                />
                                <Form.Input id={"username"}
                                            placeholder='Kullanıcı Adı'
                                            label='Kullanıcı Adı'
                                            value={this.state.userInfo.username}
                                            onChange={this.handleInputChange}
                                            required
                                />
                            </Form.Group>
                            <Form.Group widths={"equal"}>
                                <Form.Input id={"phone"}
                                            placeholder='Telefon Numarası'
                                            label='Telefon Numarası'
                                            value={this.state.userInfo.phone}
                                            onChange={this.handleInputChange}
                                            maxLength="10"
                                            required
                                />
                                <Form.Input id={"email"}
                                            placeholder='Mail Adresi'
                                            label='Mail Adresi'
                                            value={this.state.userInfo.email}
                                            onChange={this.handleInputChange}
                                            maxLength="40"
                                            required
                                />
                            </Form.Group>
                            <Form.Group widths={"equal"}>
                                <Form.Dropdown id={"status"}
                                               placeholder="Durum"
                                               label='Durum'
                                               value={this.state.userInfo.status}
                                               onChange={this.handleStatusChange}
                                               control={Select}
                                               options={Object.keys(userStatus).map((key) => ({text: userStatus[key].label, value: userStatus[key].value}))}
                                               required
                                />
                            </Form.Group>
                        </Form>
                    </Segment>
                </Page.Content>
                {
                    this.state.submitStatus && this.state.submitStatus === true &&
                    <Message success icon>
                        <Icon name='checkmark'/>
                        <Message.Content>
                            <Message.Header>
                                Kullanıcı başarıyla oluşturulmuştur.
                            </Message.Header>
                        </Message.Content>
                    </Message>
                }
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createUser: (body, callback) => {
            dispatch(userActions.createUserAction(body, callback));
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser));