import axios from 'axios';
import {
    API_CLUB_CREATE_URL,
    API_CLUB_UPDATE_URL,
    API_CLUB_DELETE_URL,
    API_CLUB_INFO_URL,
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

export const clubInfoService = (id, callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_CLUB_INFO_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const clubCreateService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_CLUB_CREATE_URL),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}
