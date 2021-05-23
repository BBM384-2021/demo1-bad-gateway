import * as clubService from "../services/club";
import * as subClubService from '../services/subClub';

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

export const clubCreateAction = (data, callback) => {
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

export const deleteClubAction = (id,callback) => {
    return (dispatch, getStatus) => {
        return clubService.deleteClubService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const subClubListAction = (clubId, callback) => {
  return (dispatch, getState) => {
    return clubService.subClubListService(clubId).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
};

export const clubCommentListAction = (clubId, callback) => {
  return (dispatch, getState) => {
    return clubService.clubCommentListService(clubId).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
};

export const createCommentAction = (data, callback) => {
  return (dispatch, getStatus) => {
    return clubService.createCommentService(data).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}

export const commentCreateAction = (data, callback) => {
  return (dispatch, getStatus) => {
    return clubService.commentCreateService(data).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}


export const getEnrolledClubsAction = (callback) => {
    return (dispatch, getStatus) => {
        return clubService.getEnrolledClubsService().then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}


export const getAllClubsAction = (callback) => {
    return (dispatch, getStatus) => {
        return clubService.getAllClubsService().then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const getAllClubNamesAction = (callback) => {
  return (dispatch, getStatus) => {
    return clubService.getAllClubNamesService().then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}

export const uploadPhotoAction = (name, data, callback, uploadFileErrorCallback) => {
    return (dispatch, getStatus) => {
        return clubService.clubPhotoUpload(name, data).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                uploadFileErrorCallback();
            });
    }
}
