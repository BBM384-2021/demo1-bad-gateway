import * as userService from "../services/user";

export const userListAction = (page, filters, callback) => {
    return (dispatch, getState) => {

        return userService.userListService(page, filters, callback).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const userInfoAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return userService.userInfoService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const editUserAction = (body, callback) => {
    return (dispatch, getState) => {

        return userService.editUserService(body).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const createUserAction = (body, callback) => {
    return (dispatch, getState) => {

        return userService.createUserService(body).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const userStatusToggle = (id, callback) => {
    return (dispatch, getState) => {
        return userService.userStatusToggle(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};
