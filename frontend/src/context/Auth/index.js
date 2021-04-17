import { useReducer, createContext, useEffect, useContext } from 'react';
import { reducer } from './reducer';
import * as actionTypes from './actionTypes';
import { useHistory } from 'react-router-dom';
import * as PATHS from '../../constants/paths';
import axiosInstance from '../../utils/getAxiosInstance'
const initialState = {
  isLogged: false,
  isLoading: false,
  error: null,
  userInfo: {},
  role:null,
  token:null
};

export const AuthContext = createContext(initialState);

const AuthSystem = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const userRegister = async (req) => {
    console.log("req: ",req)
    try {
      dispatch({ type: actionTypes.REGISTER_START });
      const body = {
        email:req.email || "",
        username:req.username || "",
        password:req.password || "",
        passwordRepeat:req.passwordConfirm || ""
      }
      console.log("before")
      await axiosInstance.post('/api/auth/signup',body).then((res)=> {
        console.log("signup success")
        console.log(res)
        dispatch({ type: actionTypes.REGISTER_SUCCESS });
        history.push({ pathname: PATHS.LOGIN });
      }).catch((error)=>{
        console.log("signup error")
        console.log(error)
      })
      console.log("after")

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
      console.log(req)
      dispatch({ type: actionTypes.LOGIN_START });
      const body = {
        username: req.username,
        password: req.password
      }
      await axiosInstance.post('/api/auth/login',body).then((res)=>{
        console.log("login success")
        console.log(res)
        console.log("after res")
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { data:res.data},
        });
        history.push(PATHS.HOME);
      }).catch((error)=> {
        console.log("login error: ",error)
      })

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
