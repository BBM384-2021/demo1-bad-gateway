import axios from "axios";
import {API_CATEGORY_ALL, API_CATEGORY_ADD} from "../../constants/urls";
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

export const addCategoryService = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(encodeURI(API_CATEGORY_ADD),data,
            getHeaderWithToken())
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.log(error)
                apiError(error, reject);
            });
    }));
};