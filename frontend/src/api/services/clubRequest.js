import axios from 'axios';
import { API_CLUB_REQUEST_CREATE_URL, API_CLUB_REQUEST_LIST_URL } from '../../constants/urls';
import { getHeaderWithToken } from '../../utils/auth';
import { apiError } from '../apiError';


export const createClubRequestService = (data, callback) => {
  return new Promise(((resolve, reject) => {
    axios.post(encodeURI(API_CLUB_REQUEST_CREATE_URL), data,
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}

export const clubRequestListService = (page) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_CLUB_REQUEST_LIST_URL),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
};