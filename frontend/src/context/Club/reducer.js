import * as actionTypes from './actionTypes';

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.GET_CLUBS_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_CLUBS_SUCCESS:
      return {
        ...state,
        clubs: action.payload.data.content,
        isLoading: false,
      };
    case actionTypes.GET_CLUBS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.DELETE_CLUB_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_CLUB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.DELETE_CLUB_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
