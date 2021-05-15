import axios from "axios";
import {
    API_PC_CHAT_MESSAGE_SEND,
    API_PC_CHAT_VIEW_MESSAGES,
    API_PC_CHAT_VIEW_NEW_MESSAGES,
    API_PC_CHAT_LIST_PEOPLE
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const listMessagesService = (date, receiverId, callback) => {
    let dateFilter = "";
    if(date !==  null){
        dateFilter = "&sentAt=" + date;
    }

    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_PC_CHAT_VIEW_MESSAGES + "?receiverId=" + receiverId + dateFilter),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const listPeopleService = (callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_PC_CHAT_LIST_PEOPLE),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const loadNewService = (date, receiverId, callback) => {
    let dateFilter = "";
    if(date !==  null){
        dateFilter = "&sentAt=" + date;
    }

    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_PC_CHAT_VIEW_NEW_MESSAGES + "?id=" + receiverId + dateFilter),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const sendMessageService = (id, data, callback) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_PC_CHAT_MESSAGE_SEND + "?id=" + id), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};



