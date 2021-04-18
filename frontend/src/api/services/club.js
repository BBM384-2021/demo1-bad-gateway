import axios from 'axios';
import {
  API_CLUB_LIST_URL
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const clubListService = (page, name, category) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_CLUB_LIST_URL + "?page="+page+"&name="+name + "&category="+category),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
};