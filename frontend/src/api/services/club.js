import axios from 'axios';
import {
    API_CLUB_CREATE_URL,
    API_CLUB_UPDATE_URL,
    API_CLUB_DELETE_URL,
    API_CLUB_INFO_URL,
    API_CLUB_LIST_URL,
    API_CLUB_SUBCLUB_LIST_URL,
    API_CLUB_COMMENT_LIST_URL,
    API_COMMENT_CREATE,
    API_CLUB_ALL,
    API_CLUB_PHOTO_UPLOAD,
    API_CLUB_ENROLLED
} from '../../constants/urls';
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const clubListService = (page, name, category) => {
  return new Promise(((resolve, reject) => {
      let query = "";
      if(name !== null && name !== undefined && name !== ""){
          query += `&name=${name}`;
      }
      if(category !== null && category !== undefined && category !== ""){
          query += `&category=${category}`;
      }

    axios.get(encodeURI(API_CLUB_LIST_URL + "/?page="+page+query),
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
        axios.post(encodeURI(API_CLUB_CREATE_URL),data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}
export const updateClubService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.put(encodeURI(API_CLUB_UPDATE_URL),data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const deleteClubService = (id) => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_CLUB_DELETE_URL+"?id="+id),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const subClubListService = (clubId) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_CLUB_SUBCLUB_LIST_URL+"?clubId="+clubId),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
};

export const clubCommentListService = (clubId) => {
  return new Promise(((resolve, reject) => {
    axios.get(encodeURI(API_CLUB_COMMENT_LIST_URL+"?clubId="+clubId),
      getHeaderWithToken())
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        apiError(error, reject);
      });
  }));
};

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

export const commentCreateService = (data, callback) => {
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


// returns all sub clubs of given club.
export const getEnrolledClubsService = () => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_CLUB_ENROLLED),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}

export const getAllClubsService = () => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_CLUB_ALL),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
}


export const clubPhotoUpload = (name, data, callback) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_CLUB_PHOTO_UPLOAD+"?name="+name), data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                //axiosError(error, reject);
            });
    }));
}