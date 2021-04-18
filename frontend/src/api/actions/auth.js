import * as authorizeService from "../services/auth";
import * as actionTypes from "../../store/actions/types"
import {resetLoginInfo, setLoginInfo} from "../../utils/auth";

export function checkTokenAction(token, callback, errorCallback) {
    return (dispatch, getState) => {
        return authorizeService.setCheckTokenService(token).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                errorCallback();
            });
    }
}

export function setPasswordAction(data, currentLocation, callback) {
    return (dispatch, getState) => {
        return authorizeService.setPasswordService(data, currentLocation).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}


export const forgotPasswordAction = (data, callback) => {
    return (dispatch, getState) => {
        return authorizeService.forgotPasswordService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const loginAction = (data, callback) => {
    return (dispatch, getState) => {
        return authorizeService.loginService(data).then((result) => {
                let {tokenType, token, roles} = result.data;

                // Set token information on localstorage
                setLoginInfo(tokenType, token, roles);

                // Reset States
                //dispatch(resetChat());

                // Load User Info
                dispatch(userInfoAction());
            },
            (error) =>{
            });
    }
};

export const signupAction = (data, callback) => {
    return (dispatch, getState) => {
        console.log("here");
        return authorizeService.signupService(data).then((result) => {
                if(callback){
                    callback(result.data);
                }
            },
            (error) =>{
            });
    }
};

export const logoutAction = () => {
    return (dispatch, getState) => {

        // Cleare localstorage
        resetLoginInfo();

        // Reset States
        //dispatch(resetChat());

        dispatch(logout());
    }
};

export const userInfoAction = (callback) => {
    return (dispatch, getState) => {
        return authorizeService.userInfoService().then(
            (result) => {
                // Load User Info
                dispatch(userInfo(result.data));
                if(callback){
                    callback(result.data);
                }
            },
            (error) =>{
                dispatch(logoutAction());
            });
    }
};

export const resetPasswordAction = (body, callback) => {
    return (dispatch, getState) => {

        return authorizeService.passwordResetService(body).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};


/*==================================================== ACTION CONSTRUCTIONS ==========================================*/


const userInfo = (data) =>{
    return {
        type: actionTypes.USER_INFO,
        payload: {
            username: data.username,
            email: data.email,
            name: data.name,
            phone: data.phone,

            passwordReset: data.passwordReset,

            roles: data.roles,
        }
    }
};

const logout = () =>{
    return {
        type: actionTypes.USER_LOGOUT,
        payload: {}
    }
};
