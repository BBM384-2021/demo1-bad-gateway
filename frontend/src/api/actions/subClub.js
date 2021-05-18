import * as subClubService from "../services/subClub";

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


export const getAllSubClubsAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.getAllSubClubsService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}