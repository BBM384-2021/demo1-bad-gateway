import axios from 'axios';
import { API_CLUB_REQUEST_CREATE_URL } from '../../constants/urls';
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