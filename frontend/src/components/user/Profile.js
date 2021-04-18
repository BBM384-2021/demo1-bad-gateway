import React, {Component} from 'react'
import {Button, Icon, Loader, Segment, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

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
                    Yükleniyor...
                </Loader>
            )
        }

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>Profil</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Button compact size={"small"} as={Link} to={"/user/update/" + this.state.userInfo.id}>
                            <Icon name='edit' color={"blue"}/>
                            Düzenle
                        </Button>
                        <Button compact size={"small"} as={Link} to={"/user/change-password/"}>
                            <Icon name='edit' color={"blue"}/>
                            Şifre Değiştirme
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
                                    <Table.Cell>{this.state.userInfo.name}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Kullanıcı
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.username}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Mail Adresi
                                    </Table.Cell>
                                    <Table.Cell>{this.state.userInfo.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        Telefon
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
