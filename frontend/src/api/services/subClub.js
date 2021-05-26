import axios from "axios";
import {
  API_COMMENT_CREATE,
  API_SC_COMMENT_LIST_URL,
  API_SUB_CLUB_ALL,
  API_SUB_CLUB_CREATE,
  API_SUB_CLUB_DELETE,
  API_SUB_CLUB_INFO_URL,
  API_SUB_CLUB_LIST_URL,
  API_SUB_CLUB_ENROLLED,
  API_SUB_CLUB_UPDATE,
  API_SC_PHOTO_UPLOAD, API_CHECK_ENROLLED_SUB_CLUB,
} from '../../constants/urls';

import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const subClubInfoService = (id, callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_SUB_CLUB_INFO_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

// returns all sub clubs of given club.
export const getEnrolledSubClubsService = (clubId, callback) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_SUB_CLUB_ENROLLED+"?clubId="+clubId),
            getHeaderWithToken())
            .then(function (response) {
              console.log("response enrolled")
              console.log(response)
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const subClubListService = (page, name, category, parentClub) => {
    return new Promise(((resolve, reject) => {
        let query = "";
        if(name !== null && name !== undefined && name !== ""){
            query += `&name=${name}`;
        }
        if(category !== null && category !== undefined && category !== ""){
            query += `&category=${category}`;
        }

        if(parentClub !== null && parentClub !== undefined && parentClub !== ""){
            query += `&parentClub=${parentClub}`;
        }
        console.log(query)
        axios.get(encodeURI(API_SUB_CLUB_LIST_URL + "/?page="+page+query),
          getHeaderWithToken())
          .then(function (response) {
              resolve(response);
          })
          .catch(function (error) {
              apiError(error, reject);
          });
    }));
};

export const subClubCommentListService = (subClubId) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_SC_COMMENT_LIST_URL+"?subClubId="+subClubId),
          getHeaderWithToken())
          .then(function (response) {
              resolve(response);
          })
          .catch(function (error) {
              apiError(error, reject);
          });
    }));
};

export const deleteClubService = (id) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_SUB_CLUB_DELETE+"?id="+id),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}

export const createCommentService = (data, callback) => {
  return new Promise(((resolve, reject) => {
    axios.post(encodeURI(API_COMMENT_CREATE), data,
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}

export const createSubClubService = (body) => {
  return new Promise(((resolve, reject) => {
    axios.post(encodeURI(API_SUB_CLUB_CREATE), body,
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}

export const getAllSubClubsService = () => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_SUB_CLUB_ALL),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}

export const editSubClubService = (body) => {
  return new Promise(((resolve, reject) => {
    axios.put(encodeURI(API_SUB_CLUB_UPDATE), body,
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        //axiosError(error, reject);
      });
  }));
}

export const subClubPhotoUpload = (name, data, callback) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_SC_PHOTO_UPLOAD + "?name=" + name), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                //axiosError(error, reject);
            });
    }));
}

export const checkEnrolledSubClubService = (subClubId, callback) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_CHECK_ENROLLED_SUB_CLUB+"?subClubId="+subClubId),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
}