import axios from "axios";
import {API_SUB_CLUB_INFO_URL} from "../../constants/urls";
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