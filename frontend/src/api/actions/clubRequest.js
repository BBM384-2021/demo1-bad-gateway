import * as clubRequestService from '../services/clubRequest';
import * as subClubService from '../services/subClub';


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

export const ClubRequestListAction = (page, callback) => {
  return (dispatch, getState) => {

    return clubRequestService.clubRequestListService(page).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
};