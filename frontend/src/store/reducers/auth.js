
import {AuthStates} from "../../constants/common";
import {USER_INFO, USER_LOGOUT} from "../actions/types";

const initialState = {
    loginStatus: AuthStates.PROCESS,
    username: "",
    email: "",
    name: "",
    phone: "",

    passwordReset: false,

    roles: [],
};

export let auth = (state = initialState, action) => {
    const { payload } = action;

    switch(action.type) {
        case USER_INFO:
            return{
                ...state,
                loginStatus: AuthStates.VALID,

                username: payload.username,
                email: payload.email,
                name: payload.name,
                phone: payload.phone,

                passwordReset: payload.passwordReset,

                roles: payload.roles,
            };
        case USER_LOGOUT:
            return {
                ...initialState,
                loginStatus: AuthStates.NONE,
            };
        default:
            return state
    }
};
