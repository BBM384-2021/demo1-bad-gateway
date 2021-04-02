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
        userInfo: action.payload.data,
        groups: { isB2B: action.payload.isB2B },
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
