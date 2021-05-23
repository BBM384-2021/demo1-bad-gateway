import React, {Component} from 'react'
import {Button, Icon, Loader, Segment, Table, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import defaultImage from '../../static/image/white-image.png'
import * as authActions from "../../api/actions/auth";

import {LoadingStates} from "../../constants/common";
import Page from "../base/Page";

class Profile extends Component {
    state = {
        status: LoadingStates.NOT_LOADED,
        userInfo: null
    };

    componentDidMount() {

        this.setState({
            status: LoadingStates.LOADING
        });

        this.props.getProfileInfo(this.profileInfoCallback);
    }

    profileInfoCallback = (userInfo) => {
        this.setState({
            status: LoadingStates.LOADED,
            userInfo: userInfo,
        })
    };

    render() {
        const {status, userInfo} = this.state;

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
                    <Page.Header.Item>Profile</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} as={Link} to={"/user/update/" + this.state.userInfo.id}>
                            <Icon name='edit' color={"blue"}/>
                            Edit
                        </Button>
                        <Button compact size={"small"} as={Link} to={"/user/change-password/"}>
                            <Icon name='edit' color={"blue"}/>
                            Change Password
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>
                <Page.Content>
                    <Segment>

                    <Image
                            centered
                            size='medium'
                            src={defaultImage}
                        />
                        <Table celled striped>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Name/Surname
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.name}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        User
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.username}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Email
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Phone Number
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.phone}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Page.Content>
            </Page>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfileInfo: (callback) => {
            dispatch(authActions.userInfoAction(callback))
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth,
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
