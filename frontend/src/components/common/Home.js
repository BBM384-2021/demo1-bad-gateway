import React, {Component} from 'react'
import {withRouter} from "react-router-dom";

import {AuthStates} from "../../constants/common";

import Header from "./Header";
import {PrivateRoutes, PublicRoutes} from "../../routes/Routes";



class Home extends Component{
    state = {
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        const {auth} = this.props;

        return(
            <React.Fragment>
                <Header auth={auth}/>

                {
                    auth.loginStatus === AuthStates.VALID ?
                        <div className={"body"}>
                            <PrivateRoutes auth={auth}/>
                        </div>:
                        <div className={"body-public"}>
                            <PublicRoutes auth={auth}/>
                        </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Home);
