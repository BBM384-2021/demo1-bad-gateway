import React, {Component} from 'react'
import {Icon, Menu, Dropdown} from 'semantic-ui-react'

import {connect} from "react-redux";

import {Link, withRouter} from "react-router-dom";

import * as authActions from "../../api/actions/auth";

import logo from '../../static/image/common/logo.png';
import '../../static/css/common/Header.css';
import {AuthStates} from "../../constants/common";

import {getAllowedMenuRoutes} from "../../routes/Routes";
import Context from "react-redux/lib/components/Context";


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
                            <div className={"top-menu-right"}>
                                <Menu secondary>
                                    <Menu.Menu position='right'>
                                        <Menu.Item
                                            as={ Dropdown }
                                            text={<React.Fragment><Icon name='user' /> {auth.username}</React.Fragment>}
                                        >
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to={'/user/profile'}><Icon name='user circle' /> Profil</Dropdown.Item>
                                                <Dropdown.Item as={Link} to={'/user/change-password'}><Icon name='edit' /> Şifre Değiştirme</Dropdown.Item>
                                                <Dropdown.Item onClick={this.props.logout}><Icon name='sign-out' /> Çıkış</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                            </div> : null
                    }


                </div>
                {
                    auth.loginStatus === AuthStates.VALID ?
                        <React.Fragment>
                            <div className={"nav-menu"}>
                                <Menu secondary>
                                    {
                                        routes.map((route) => {
                                            let randomKey = btoa(route.path);

                                            return(
                                                <Menu.Item key={randomKey} name={randomKey} as={Link} to={route.path} active={activeItem === randomKey} onClick={this.handleMenuClick}>
                                                    <Icon name={route.menuIcon || "list"} color={"blue"} /> <span> </span> {route.title}
                                                </Menu.Item>
                                            );
                                        })
                                    }
                                </Menu>
                            </div>
                        </React.Fragment>: null
                }
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
