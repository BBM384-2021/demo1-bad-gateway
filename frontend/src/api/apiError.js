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
        response = "Bağlantı problemi oluştu. Lütfen ağ ayarlarınızı kontrol ediniz.";
        popup = true;
    } else if(error.response.data.status === 401){
        store.dispatch({
            type: USER_LOGOUT,
            payload: {}
        });
        if (response === "Full authentication is required to access this resource"){
            response = "Oturumunuz sona ermiştir. Lütfen Tekrar Giriş Yapınız.";
        }

        popup = true;
    }

    if(popup) {
        swal({
            title: 'Hata',
            text: response,
            icon: 'error'
        });
    }
    else
        reject(response);

};

