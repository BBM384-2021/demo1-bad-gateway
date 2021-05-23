import React, {Component} from 'react'
import {Icon, Menu, Dropdown, Button, Grid} from 'semantic-ui-react'

import {connect} from "react-redux";

import {Link, withRouter} from "react-router-dom";

import * as authActions from "../../api/actions/auth";

import logo from '../../static/image/common/logo.png';
import '../../static/css/common/Header.css';
import { AuthStates, LoadingStates } from '../../constants/common';

import {getAllowedMenuRoutes} from "../../routes/Routes";
import {getRoles} from "../../utils/auth";


class Header extends Component {
    state = {
        activeItem: '',
        roles:[],
    };

    componentDidMount() {
        const {auth} = this.props;
        let roles = getRoles();
        this.setState({
              roles:roles
          }
        )
    }

    handleMenuClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const {auth} = this.props;
        const routes = getAllowedMenuRoutes();

        return (
            <div className={"header"}>
                <div className={"top-menu"}>
                    <div className="top-menu-logo">
                        <Link to={"/"}>
                            <img src={logo} width={100} alt={"SpiritsUp"}/>
                        </Link>
                    </div>

                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"/>

                    <div className={"top-menu-title"}>
                        <h1 class="ui header" style={{color: "white", fontFamily: 'Permanent Marker', fontSize: "30px"}}>SpiritsUp</h1>
                    </div>
                    {
                        auth.loginStatus === AuthStates.VALID?
                            <Grid>
                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/event/list"} style={{color:"white", marginLeft:"600px"}}>Events</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/private_message"} style={{color:"white", marginLeft:"700px"}}>PC</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/club/list"} style={{color:"white", marginLeft:"800px"}}>Clubs</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/chat/1"} style={{color:"white", marginLeft:"900px"}}>Chat</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}} >
                                   <Dropdown text={auth.username} style={{width: "100px", color:"white", marginLeft:"950px"}}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={'/user/profile'}><Icon name='user circle' /> Profile</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={'/user/change-password'}><Icon name='edit' /> Change Password</Dropdown.Item>
                                            {getRoles() ? getRoles().find((item)=> item==="ADMIN") &&
                                                <Dropdown.Item as={Link} to={'/club_request/list'}><Icon name='list' />Club Request List</Dropdown.Item>
                                            : null}
                                            {getRoles() ? getRoles().find((item)=> item==="MEMBER") &&
                                              <Dropdown.Item as={Link} to={'/club_request/create'}><Icon name='pencil alternate' />Request Club</Dropdown.Item>
                                              : null}
                                            <Dropdown.Item onClick={this.props.logout}><Icon name='sign-out' /> Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                   </Dropdown>
                                </Grid.Column>

                            </Grid> : <Grid>>
                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/login"} style={{color:"white", marginLeft:"900px"}}>Login</Link>
                                </Grid.Column>
                            </Grid>
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        /*
        getNotifications: (pageNumber) => {
            dispatch(notificationActions.dbNotifications(pageNumber))
        },
        updateNotification: (data) =>{
            dispatch(notificationActions.dbUpdateNotification(data))
        },*/
        logout: () => {
            dispatch(authActions.logoutAction())
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth,
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
