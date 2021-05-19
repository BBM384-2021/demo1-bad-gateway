import axios from 'axios';
import {
    API_USER_VIEW_URL,
    API_USER_LIST_URL,
    API_USER_EDIT_URL,
    API_USER_CREATE_URL,
    API_USER_STATUS_TOGGLE_URL, API_USER_ALL,
} from '../../constants/urls';
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";

export const userListService = (page, filters, callback) => {
    return new Promise(((resolve, reject) => {
        let query = "";
        for(let key in filters){
            if(filters[key]){
                query += `&${key}=${filters[key]}`;
            }
        }
        axios.get(encodeURI(API_USER_LIST_URL  + "?page="+page+query),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const userInfoService = (id, callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_USER_VIEW_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const editUserService = (body) => {
    return new Promise(((resolve, reject) => {
        axios.put(encodeURI(API_USER_EDIT_URL), body,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                //axiosError(error, reject);
            });
    }));
}

export const createUserService = (body) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_USER_CREATE_URL), body,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const userStatusToggle = (id) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_USER_STATUS_TOGGLE_URL+"?id="+id), {},
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const getAllUsersService = () => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_USER_ALL),
          getHeaderWithToken())
          .then(function (response) {
              resolve(response);
          })
          .catch(function (error) {
              apiError(error, reject);
          });
    }));
};