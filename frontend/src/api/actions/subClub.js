import * as subClubService from "../services/subClub";
import * as clubService from "../services/club";

export const subClubInfoAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.subClubInfoService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}


export const getEnrolledSubClubsAction = (clubId, callback) => {
    console.log("inside action")
    return (dispatch, getStatus) => {
        return subClubService.getEnrolledSubClubsService(clubId).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const subClubListAction = (page, name, category, parentClub, callback) => {
    return (dispatch, getState) => {

        return subClubService.subClubListService(page, name, category, parentClub).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const subClubCommentListAction = (subClubId, callback) => {
    return (dispatch, getState) => {
        return subClubService.subClubCommentListService(subClubId).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const deleteSubClubAction = (id,callback) => {
    return (dispatch, getStatus) => {
        return subClubService.deleteClubService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const createCommentAction = (data, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.createCommentService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const createSubClubAction = (body, callback) => {
    return (dispatch, getState) => {

        return subClubService.createSubClubService(body).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const getAllSubClubsAction = (callback) => {
    return (dispatch, getStatus) => {
        return subClubService.getAllSubClubsService().then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const editSubClubAction = (body, callback) => {
    return (dispatch, getState) => {

        return subClubService.editSubClubService(body).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const uploadPhotoAction = (name, data, callback, uploadFileErrorCallback) => {
    return (dispatch, getStatus) => {
        return subClubService.subClubPhotoUpload(name, data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                uploadFileErrorCallback();
            });
    }
}

export const checkEnrolledSubClubAction = (subClubId, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.checkEnrolledSubClubService(subClubId,).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}