import axios from 'axios';
import {
    API_EVENT_LIST_URL,
    API_EVENT_INFO_URL,
    API_EVENT_CREATE_URL,
    API_EVENT_UPDATE_URL,
    API_EVENT_DELETE_URL
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const eventListService = (page, name, eventType, beforeEventDate, afterEventDate) => {
    return new Promise(((resolve, reject) => {
        let query = "";
        if(name !== null && name !== undefined && name !== ""){
            query += `&name=${name}`;
        }
        if(eventType !== null && eventType !== undefined && eventType !== ""){
            query += `&eventType=${eventType}`;
        }
        if(beforeEventDate !== null && beforeEventDate !== undefined && beforeEventDate !== ""){
            query += `&beforeEventDate=${beforeEventDate}`;
        }
        if(afterEventDate !== null && afterEventDate !== undefined && afterEventDate !== ""){
            query += `&afterEventDate=${afterEventDate}`;
        }

        axios.get(encodeURI(API_EVENT_LIST_URL + "/?page="+page+query),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};



export const eventInfoService = (id, callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_EVENT_INFO_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const eventCreateService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_EVENT_CREATE_URL),data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const eventUpdateService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.put(encodeURI(API_EVENT_UPDATE_URL),data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const eventDeleteService = (id, callback) => {
    return new Promise(((resolve, reject) => {
        axios.delete(encodeURI(API_EVENT_DELETE_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}