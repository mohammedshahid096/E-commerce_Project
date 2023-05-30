import axios from "axios";
import { URLConstant } from "../Constraints/URLConstant";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_FININSH,
  GET_ALL_USERS_REQUREST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../Constraints/UserConstant";

// TODO: Login Action
export const login = (email, password) => async (disptach) => {
  const url = URLConstant;
  try {
    disptach({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${url}users/login`,
      { email, password },
      config
    );

    disptach({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // console.log(error);
    disptach({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO: Register Action
export const Register = (details) => async (disptach) => {
  const url = URLConstant;
  try {
    disptach({
      type: REGISTER_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${url}users/register`, details, config);
    // console.log(data);

    disptach({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    disptach({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO: Load User
export const load_user = () => async (dispatch) => {
  const url = URLConstant;

  dispatch({
    type: LOAD_USER_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}users/me`);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO: Logout Function
export const Logout = () => async (dispatch) => {
  const url = URLConstant;
  try {
    await axios.get(`${url}users/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// TODO:  Upade user profile Action
export const Update_profile = (details) => async (disptach) => {
  const url = URLConstant;
  try {
    disptach({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${url}users/me/update`, details, config);

    disptach({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    disptach({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const successFullyUpdate = () => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_FININSH });
};

// ! ======================================
// !      admin Actions
// ! ======================================

export const GetAllUsers = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: GET_ALL_USERS_REQUREST,
    });

    const { data } = await axios.get(`${url}users/admin/allusers`);

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const GetSingleUser = (userID) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ADMIN_USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${url}users/admin/${userID}`);

    dispatch({
      type: ADMIN_USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdminUserUpdate = (userID, Data) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}users/admin/${userID}`,
      Data,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdminUserDelete = (userID) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    const { data } = await axios.delete(`${url}users/admin/${userID}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO: Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
