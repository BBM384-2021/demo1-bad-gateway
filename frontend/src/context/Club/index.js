import { useReducer, createContext, useEffect, useContext } from 'react';
import { reducer } from './reducer';
import * as actionTypes from './actionTypes';
import { useHistory } from 'react-router-dom';
import * as PATHS from '../../constants/paths';
import axiosInstance from '../../utils/getAxiosInstance';
const initialState = {
  clubs: null,
  isLoading: false,
  categories: null,
};
/* global BigInt */
export const ClubContext = createContext(initialState);

const ClubSystem = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const getCategories = async (req) => {
    try {
      dispatch({ type: actionTypes.GET_CATEGORIES_START });
      const body = {};

      await axiosInstance
        .post('/api/club/categories', body)
        .then((res) => {
          dispatch({
            type: actionTypes.GET_CATEGORIES_SUCCESS,
            payload: { data: res.data },
          });
        })
        .catch((error) => {
          console.log('signup error');
          console.log(error);
        });
      console.log('after');
    } catch (error) {
      //error message
      dispatch({ type: actionTypes.GET_CATEGORIES_FAIL, payload: { error: error } });
    }
  };

  const getClubs = async (req) => {
    console.log('req: ', req);
    let category = req.category || '';
    try {
      dispatch({ type: actionTypes.GET_CLUBS_START });
      const body = {
        name: req.name,
        category: category,
      };

      await axiosInstance
        .get('/api/club/list',null, { params:body } )
        .then((res) => {
          console.log("inside get clubs")
          console.log(res)
          dispatch({ type: actionTypes.GET_CLUBS_SUCCESS, payload: { data: res.data } });
          //history.push({ pathname: PATHS.LOGIN });
        })
        .catch((error) => {
          console.log('signup error');
          console.log(error);
        });
      console.log('after');
    } catch (error) {
      //error message
      dispatch({ type: actionTypes.GET_CLUBS_FAIL, payload: { error: error } });
    }
  };

  const deleteClub = async (req) => {
    try {
      dispatch({ type: actionTypes.DELETE_CLUB_START });
      const id = BigInt(3);
      await axiosInstance
          .get('/api/club/delete',null, { params:{id:id}} )
          .then((res) => {
            console.log("inside delete clubs")
            console.log(res)
            dispatch({ type: actionTypes.DELETE_CLUB_SUCCESS, payload: { data: res.data } });
            //history.push({ pathname: PATHS.LOGIN });
          })
          .catch((error) => {
            console.log('DELETE CLUB error');
            console.log(error);
          });
      console.log('after');
    } catch (error) {
      //error message
      dispatch({ type: actionTypes.DELETE_CLUB_FAIL, payload: { error: error } });
    }
  };

  return (
    <ClubContext.Provider
      value={{
        clubState: state,
        clubDispatch: dispatch,
        getClubs,
        getCategories,
        deleteClub
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export default ClubSystem;

export const useClubContext = () => useContext(ClubContext);
