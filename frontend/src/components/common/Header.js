import React, {Component} from 'react'
import {Icon, Menu, Dropdown, Button, Grid} from 'semantic-ui-react'

import {connect} from "react-redux";

import {Link, withRouter} from "react-router-dom";

import * as authActions from "../../api/actions/auth";

import logo from '../../static/image/common/logo.png';
import '../../static/css/common/Header.css';
import {AuthStates} from "../../constants/common";

import {getAllowedMenuRoutes} from "../../routes/Routes";


class Header extends Component {
    state = {
        activeItem: '',
    };

    handleMenuClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const {activeItem} = this.state;
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
                                    <Link to={"/club/list"} style={{color:"white", marginLeft:"1000px"}}>Clubs</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}}>
                                    <Link to={"/chat/1"} style={{color:"white", marginLeft:"1050px"}}>Chat</Link>
                                </Grid.Column>

                                <Grid.Column style={{marginTop:"45px"}} >
                                   <Dropdown text={auth.username} style={{width: "100px", color:"white", marginLeft:"1100px"}}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={'/user/profile'}><Icon name='user circle' /> Profile</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={'/user/change-password'}><Icon name='edit' /> Change Password</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.logout}><Icon name='sign-out' /> Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                   </Dropdown>
                                </Grid.Column>

                            </Grid> : null
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
