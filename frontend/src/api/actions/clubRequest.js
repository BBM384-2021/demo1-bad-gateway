import * as clubRequestService from '../services/clubRequest';


export const createClubRequestAction = (body, callback) => {
  return (dispatch, getState) => {

    return clubRequestService.createClubRequestService(body).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}