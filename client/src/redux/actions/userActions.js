import * as api from "../api/userAPI";
import * as types from "../constants/userConstants";
import { getPostsAction, getSavedPostsAction } from "./postActions";

export const getUserAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.getUser(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAIL,
      payload: error.message,
    });
  }
};
export const getPublicUsersAction = () => async (dispatch) => {
    try {
      const { error, data } = await api.getPublicUsers();
  
      if (error) {
        throw new Error(error);
      }
  
      dispatch({
        type: types.GET_PUBLIC_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.GET_PUBLIC_USERS_FAIL,
        payload: error.message,
      });
    }
  };