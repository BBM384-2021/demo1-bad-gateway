import * as subClubChatService from "../services/subclubchat";

export const messageListAction = (date, id, callback) => {
    return (dispatch, getState) => {
        return subClubChatService.listMessagesService(date, id, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const loadNewAction = (date, id, callback) => {
    return (dispatch, getState) => {
        return subClubChatService.loadNewService(date, id, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};


export const sendMessageAction = (id, data, callback) => {
    return (dispatch, getState) => {
        return subClubChatService.sendMessageService(id, data, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};
