import axios from 'axios';
import {
    API_SEARCH_URL
} from "../../constants/urls";

import {apiError} from "../apiError";
import {getHeaderWithToken} from "../../utils/auth";


export const searchService = (page, name) => {
    return new Promise(((resolve, reject) => {
        let query = "";
        if (name !== null && name !== undefined && name !== "") {
            query += `&name=${name}`;
        }

        axios.get(encodeURI(API_SEARCH_URL + "/?page=" + page + query),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });


    }));
};