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


export const getEnrolledSubClubsAction = (clubId, callback) => {
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