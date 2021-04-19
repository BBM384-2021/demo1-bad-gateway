import * as clubService from "../services/club";
import * as actionTypes from "../../store/actions/types";
import {LoadingStates} from "../../constants/common";
import axios from "axios";
import {API_CLUB_CREATE_URL} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";

export const clubListAction = (page, name, category, callback) => {
  return (dispatch, getState) => {

    return clubService.clubListService(page, name, category).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
};

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

export const clubCreateAction = (data,callback) => {
    return (dispatch, getStatus) => {
        return clubService.clubCreateService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const updateClubAction = (data,callback) => {
    return (dispatch, getStatus) => {
        return clubService.updateClubService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}