import * as privateMessageService from "../services/privateMessage";

export const messageListAction = (date, id, callback) => {
    return (dispatch, getState) => {
        return privateMessageService.listMessagesService(date, id, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const listPeopleAction = (callback) => {
    return (dispatch, getState) => {
        return privateMessageService.listPeopleService(callback).then(
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
        return privateMessageService.loadNewService(date, id, callback).then(
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
        return privateMessageService.sendMessageService(id, data, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};
