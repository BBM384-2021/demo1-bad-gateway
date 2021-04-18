import axios from 'axios';
import {
    API_AUTH_FORGOT_PASSWORD_URL,
    API_AUTH_LOGIN_URL,
    API_AUTH_PASSWORD_RESET_URL,
    API_USER_INFO_URL
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";

let urljoin = require('url-join');

export function setCheckTokenService(token) {
    return new Promise(((resolve, reject) => {
        axios.get(urljoin(API_AUTH_FORGOT_PASSWORD_URL, token))
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
                reject(error);
            });
    }));
}


export function setPasswordService(data, currentLocation) {
    return new Promise(((resolve, reject) => {
        axios.post(urljoin(API_AUTH_FORGOT_PASSWORD_URL, currentLocation) ,data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
                reject(error);
            });
    }));
}


export const loginService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(API_AUTH_LOGIN_URL, data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
                reject(error);
            });
    }));
};


export const userInfoService = () => {
    return new Promise(((resolve, reject) => {
        axios.get(API_USER_INFO_URL, getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
                reject(error);
            });
    }));
};

export const passwordResetService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_AUTH_PASSWORD_RESET_URL), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const forgotPasswordService = (data, callback) =>  {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_AUTH_FORGOT_PASSWORD_URL), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

