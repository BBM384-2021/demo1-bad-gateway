import axios from "axios";
import {API_CATEGORY_ALL} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";

export const getAllCategoriesService = () => {
    return new Promise(((resolve, reject) => {
        axios.get(encodeURI(API_CATEGORY_ALL),
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                apiError(error, reject);
            });
    }));
};