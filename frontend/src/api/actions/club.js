import * as clubService from "../services/club";



export const clubInfoAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return clubService.clubInfoService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}