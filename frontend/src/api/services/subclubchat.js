import axios from "axios";
import {
    API_SC_CHAT_MESSAGE_SEND,
    API_SC_CHAT_VIEW_MESSAGES,
    API_SC_CHAT_VIEW_NEW_MESSAGES
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const listMessagesService = (date, subClubId, callback) => {
    let dateFilter = "";
    if(date !==  null){
        dateFilter = "&sentAt=" + date;
    }

    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_SC_CHAT_VIEW_MESSAGES + "?id=" + subClubId + dateFilter),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};

export const loadNewService = (date, subClubId, callback) => {
    let dateFilter = "";
    if(date !==  null){
        dateFilter = "&sentAt=" + date;
    }

    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_SC_CHAT_VIEW_NEW_MESSAGES + "?id=" + subClubId + dateFilter),
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
        axios.post(encodeURI(API_SC_CHAT_MESSAGE_SEND + "?id=" + id), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};
