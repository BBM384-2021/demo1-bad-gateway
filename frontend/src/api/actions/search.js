import {searchService} from "../services/search";


export const searchAction = (page, name, callback) => {

    return (dispatch, getState) => {

        return searchService(page, name).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            }
        );
    }
};