import * as clubService from "../services/club";

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