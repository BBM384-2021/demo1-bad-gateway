import * as subClubService from "../services/subClub";

export const subClubInfoAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.subClubInfoService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}


export const getEnrolledSubClubsAction = (clubId, callback) => {
    return (dispatch, getStatus) => {
        return subClubService.getEnrolledSubClubsService(clubId).then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
}

export const subClubListAction = (page, name, category, parentClub, callback) => {
    return (dispatch, getState) => {

        return subClubService.subClubListService(page, name, category, parentClub).then(
          (result) => {
              callback(result.data);
          },
          (error) =>{
              // callback(messageError);
          });
    }
};

export const subClubCommentListAction = (subClubId, callback) => {
  return (dispatch, getState) => {
    return subClubService.subClubCommentListService(subClubId).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
};

export const deleteSubClubAction = (id,callback) => {
  return (dispatch, getStatus) => {
    return subClubService.deleteClubService(id).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}

export const createCommentAction = (data, callback) => {
  return (dispatch, getStatus) => {
    return subClubService.createCommentService(data).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}

export const createSubClubAction = (body, callback) => {
  return (dispatch, getState) => {

    return subClubService.createSubClubService(body).then(
      (result) => {
        callback(result.data);
      },
      (error) =>{
        // callback(messageError);
      });
  }
}