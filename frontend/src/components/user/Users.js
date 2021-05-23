import React, {Component} from 'react'
import {connect} from "react-redux";
import * as userActions from "../../api/actions/user";
import {LoadingStates} from "../../constants/common";
import UsersItem from "./UsersItem";
import {Button, Loader, Table, Form, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getPaginationResponse} from "../../utils/pagination";
import Pagination from "../common/Pagination";
import Page from "../base/Page";


class Users extends Component {
    state = {
        status: LoadingStates.LOADING,
        userList: [],
        filters: {
            name: "",
            username: "",
        },
        nameInput: "",
        usernameInput: "",
    };

    constructor(props) {
        super(props);

        this.handleUserList = this.handleUserList.bind(this);
        this.paginationNext = this.paginationNext.bind(this);
        this.paginationPrev = this.paginationPrev.bind(this);
        this.paginationReload = this.paginationReload.bind(this);
    }


    componentDidMount() {
        this.setState(getPaginationResponse());
        this.props.getUserList(0, {}, this.handleUserList);
    }

    paginationNext() {
        if (this.state.pagination.last === false) {
            this.props.getUserList(this.state.pagination.page + 1, this.state.filters, this.handleUserList);
        }
    }

    paginationPrev() {
        if (this.state.pagination.page !== 0) {
            this.props.getUserList(this.state.pagination.page - 1, this.state.filters, this.handleUserList);
        }
    }

    paginationReload() {
        this.props.getUserList(this.state.pagination.page, {}, this.handleUserList);
    }

    handleUserList(data) {
        this.setState({
            ...getPaginationResponse(data),
            userList: data.content,
            status: LoadingStates.LOADED
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";
        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;
        this.setState({
            filters: {
                ...this.state.filters,
                [event.target.id]: value
            }
        })
    };


    onFormSubmit = () => {
        let data = {
            username: this.state.filters.username,
            name: this.state.filters.name,
        }

        this.props.getUserList(0, data, this.handleUserList);
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
                    <Page.Header.Item>User List</Page.Header.Item>
                </Page.Header>
                <Page.Operation>
                    <Page.Operation.Buttons>
                        <Link to={"/user/create/"}>
                            <Button compact size={"small"}><Icon name={"add"} color={"blue"}/>Add New User</Button>
                        </Link>
                    </Page.Operation.Buttons>

                    <Page.Operation.Filter>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Group>
                                <Form.Input id={"username"}
                                            placeholder='Kullanıcı Adı'
                                            value={this.state.filters.username}
                                            onChange={this.handleInputChange}
                                />
                                <Form.Input id={"name"}
                                            placeholder='Ad/Soyad'
                                            value={this.state.filters.name}
                                            onChange={this.handleInputChange}
                                />
                                <Form.Button content='Ara'/>
                            </Form.Group>
                        </Form>
                    </Page.Operation.Filter>
                </Page.Operation>
                <Page.Content>
                        <Table celled striped compact>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Name/Surname</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.state.userList.length === 0 ?
                                        <Table.Row textAlign={"center"}>
                                            <Table.Cell colSpan={5}>
                                                <Message color={"red"}>User does not exist</Message>
                                            </Table.Cell>
                                        </Table.Row> :

                                        this.state.userList.map((user) =>
                                            <UsersItem
                                                key={user.id}
                                                user={user}
                                                auth={this.props.auth}
                                                reload = {this.paginationReload}
                                            />
                                        )
                                }
                            </Table.Body>
                        </Table>
                        <Pagination next={this.paginationNext} prev={this.paginationPrev()}
                                    pagination={this.state.pagination}/>
                </Page.Content>
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserList: (page, filters, callback) => {
            dispatch(userActions.userListAction(page, filters, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth, user} = state;


    return {
        auth,
        user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
