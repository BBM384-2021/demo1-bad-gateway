import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Segment, Icon, Loader, Form, Message, Button} from "semantic-ui-react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import * as userActions from "../../api/actions/user";
import Page from "../base/Page";


class EditUser extends Component {
    state = {
        userId: null,
        fields: {
            id: null,
            username: "",
            name: "",
            phone: "",
            email: "",
            roles:[]
        },
        status: LoadingStates.LOADING,
        submitStatus: null,
    };

    constructor(props) {
        super(props);
        this.handleUserEdit = this.handleUserEdit.bind(this);
    }

    componentDidMount() {
        const {userId} = this.props.match.params;
        this.setState({
            userId: userId
        })
        this.props.getUserInfo(userId, this.handleUserEdit);
    }

    handleUserEdit(data) {
        this.setState({
            fields: data,
            status: LoadingStates.LOADED,
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            fields: {
                ...this.state.fields,
                [event.target.id]: value
            }
        })
    };

    onFormSubmit = (e) => {
        this.setState({
            isFormSubmitting: false,
            submitStatus: true,
        });

        let data = {
            id: this.state.fields.id,
            name: this.state.fields.name,
            phone: this.state.fields.phone,
            email: this.state.fields.email,
            roles: this.state.fields.roles
        }
        this.props.updateUserInfo(data, this.handleUserEdit);
    };

    render() {

        const {status} = this.state;

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
                    <Page.Header.Item>User</Page.Header.Item>
                    <Page.Header.Item>Update ({this.state.fields.username})</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} onClick={this.onFormSubmit}>
                            <Icon name='save' color={"blue"}/>
                            Save
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>
                <Page.Content>
                    <Segment>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Group widths={"equal"}>
                                <Form.Input id={"name"}
                                            placeholder='Name'
                                            label='Name'
                                            value={this.state.fields.name}
                                            onChange={this.handleInputChange}
                                            maxLength="40"
                                />
                                <Form.Input id={"phone"}
                                            placeholder='Phone Number'
                                            label='Phone Number'
                                            value={this.state.fields.phone}
                                            onChange={this.handleInputChange}
                                            maxLength="10"
                                />
                                <Form.Input id={"email"}
                                            placeholder='Email'
                                            label='Email'
                                            value={this.state.fields.email}
                                            onChange={this.handleInputChange}
                                            maxLength="40"
                                />
                            </Form.Group>

                        </Form>
                    </Segment>
                </Page.Content>

                {
                    this.state.submitStatus && this.state.submitStatus === true &&
                    <div className={"mt-5"}>
                        <Message success icon>
                            <Icon name='checkmark'/>
                            <Message.Content>
                                <Message.Header>
                                    User updated successfully.
                                </Message.Header>
                            </Message.Content>
                        </Message>
                    </div>
                }
            </Page>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: (userId, callback) => {
            dispatch(userActions.userInfoAction(userId, callback));
        },
        updateUserInfo: (body, callback) => {
            dispatch(userActions.editUserAction(body, callback));
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    const {user} = state;

    return {
        user
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser));