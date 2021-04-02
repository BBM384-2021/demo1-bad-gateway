import { useReducer, createContext, useEffect, useContext } from 'react';
import { reducer } from './reducer';
import * as actionTypes from './actionTypes';
import { useHistory } from 'react-router-dom';
import * as PATHS from '../../constants/paths';


const initialState = {
  isLogged: false,
  isLoading: false,
  error: null,
  userInfo: {},
  role:null
};

export const AuthContext = createContext(initialState);

const AuthSystem = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const userRegister = async (req) => {
    try {
      dispatch({ type: actionTypes.REGISTER_START });
      dispatch({ type: actionTypes.REGISTER_SUCCESS });

      //success notification here
      history.push({ pathname: PATHS.HOME });
    } catch (error) {
      //error message
      dispatch({ type: actionTypes.REGISTER_FAIL, payload: { error: error } });
    }
  };


  /**
   *
   * @param {object} req
   */

  const userLogin = async (req) => {
    try {
      dispatch({ type: actionTypes.LOGIN_START });
      dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { data:""},
        });
        history.push(PATHS.HOME);

    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.LOGIN_FAIL, payload: { error: error } });
    }
  };
  /**
   * Log Out
   */
  const userLogout = async () => {
    try {
      dispatch({ type: actionTypes.LOGOUT_START });
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: actionTypes.LOGOUT_FAIL, payload: { error: error } });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authState: state,
        authDispatch: dispatch,
        userLogin,
        userRegister,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthSystem;

export const useAuthContext = () => useContext(AuthContext);
