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
                    Yükleniyor...
                </Loader>
            )
        }

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>Kullanıcı</Page.Header.Item>
                    <Page.Header.Item>Görüntüle ({this.state.user.username})</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} as={Link} to={"/user/update/" + this.state.user.id}>
                            <Icon name='edit' color={"blue"}/>
                            Düzenle
                        </Button>
                    </Page.Operation.Buttons>
                </Page.Operation>

                <Page.Content>
                    <Segment>


                        <Table celled striped>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Ad/Soyad
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.name}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Kullanıcı
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.username}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Mail Adresi
                                    </Table.Cell>
                                    <Table.Cell>{this.state.user.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Telefon
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