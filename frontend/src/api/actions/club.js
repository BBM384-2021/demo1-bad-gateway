import * as clubService from "../services/club";
import * as actionTypes from "../../store/actions/types";
import {LoadingStates} from "../../constants/common";

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