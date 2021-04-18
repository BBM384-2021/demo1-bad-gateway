import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {Button, Icon, Loader, Segment, Table} from "semantic-ui-react";
import * as userActions from "../../api/actions/user";

import {withRouter} from "react-router";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Link} from "react-router-dom";

class UserInfo extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        user: {},
    };

    constructor(props) {
        super(props);
        this.handleUserInfo = this.handleUserInfo.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getUserInfo(id, this.handleUserInfo);
    }

    handleUserInfo(data) {
        this.setState({
                user: data,
                status: LoadingStates.LOADED
            }
        )
    }


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
                    <Page.Header.Item>View ({this.state.user.username})</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} as={Link} to={"/user/update/" + this.state.user.id}>
                            <Icon name='edit' color={"blue"}/>
                            Edit
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>

                <Page.Content>
                    <Segment>


                        <Table celled striped>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Name/Surname
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.name}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        User
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.username}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Email
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Phone Number
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.phone}</Table.Cell>
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
        getUserInfo: (id, callback) => {
            dispatch(userActions.userInfoAction(id, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {user} = state;

    return {
        user
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));