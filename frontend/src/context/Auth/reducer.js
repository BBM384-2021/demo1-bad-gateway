import * as actionTypes from './actionTypes';

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        token:action.payload.data.token,
        role:action.payload.data.roles,
        userInfo: action.payload.data,
        isLoading: false,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogged: false,
        isLoading: false,
      };
    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
