import React, {Component} from 'react'
import {connect} from "react-redux";
import {Loader} from "semantic-ui-react";
import * as authActions from "../../api/actions/auth";
import Home from "./Home";

import {AuthStates} from "../../constants/common";

import '../../static/css/common/Application.css';
import 'semantic-ui-css/semantic.min.css'

class Application extends Component{
    state = {
    }


    componentDidMount() {
        let token = localStorage.getItem("token");
        if(token){
            this.props.getProfileInfo();
        } else {
            this.props.logout();
        }
    }

    render() {

        let {auth} = this.props;

        return (
            <React.Fragment>
                {
                    auth.loginStatus === AuthStates.PROCESS ?
                        <Loader active content={"Yükleniyor..."}/>:
                        <Home auth={auth}/>
                }
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfileInfo: (callback) => {
            dispatch(authActions.userInfoAction(callback))
        },
        logout: () => {
            dispatch(authActions.logoutAction());
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( Application);
