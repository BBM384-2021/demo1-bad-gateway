import swal from 'sweetalert'
import store from "../store/config";
import {USER_LOGOUT} from "../store/actions/types";

export const apiError = (error, reject, popup = true) => {
    let response = "";

    if(error.response && error.response.data) {
        response = error.response.data.message
    } else if(error.request) {
        response = error.message;
    }
    else {
        response = error.message;
    }

    if(error.response === undefined){
        response = "Connection problem occurred. Please check your network.";
        popup = true;
    } else if(error.response.data.status === 401){
        store.dispatch({
            type: USER_LOGOUT,
            payload: {}
        });
        if (response === "Full authentication is required to access this resource"){
            response = "Your session has ended. Please log in again.";
        }

        popup = true;
    }

    if(popup) {
        console.log(response);
        swal({
            title: 'ERROR',
            text: response,
            icon: 'error'
        });
    }
    else
        reject(response);

};

