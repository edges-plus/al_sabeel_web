/* eslint-disable no-unused-vars */
import { postApi, getApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  LOGIN,
  LOGOUT,
  SET_PERMISSIONS
} from "@root/redux/types.js";
import { setTokens, removeTokens, getAccessToken } from "@helpers/localStorage";
import { loaderOn, loaderOff } from "@actions/loaderAction";

export const login = (body) => async (dispatch) => {

  dispatch(loaderOn());
  try {
    const { data } = await postApi("/auth/login", body);
    dispatch(loaderOff());

    const { data: response } = data;


    setTokens({
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken,
      branchId: response.user.branchId,

    });
    getUserWithPermission(response.user.id)(dispatch);



    dispatch({ type: LOGIN, payload: response });




    return true;

  } catch (error) {


    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};

export const refreshToken = (body) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const { data } = await postApi("/refreshToken", body);
    const { success, data: response } = data;
    setTokens({
      user: {},
      token: response.token,
      refreshToken: response.refreshToken,
    });
    if (success) {
      dispatch({ type: LOGIN, payload: response });
      dispatch(loaderOff());
      return true;
    }

  } catch (error) {
    dispatch(loaderOff());
    return false;
  }
};

export const logout = () => async (dispatch) => {
  try {
    removeTokens({
      user: null,
      token: null,
      refreshToken: null,
    });

    dispatch({ type: LOGOUT, payload: removeTokens });
    return true;
  } catch (error) {
    await errorHandler(error);
    return false;
  }
};

export const forgotPassword = (body) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const { data } = await postApi("/forgotPassword", body);
    const { success, data: response } = data;
    if (success) {
      dispatch(loaderOff());
      return true;
    }
  } catch (error) {
    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};

export const forgotPasswordConfirm = (body) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const { data } = await postApi("/forgotReset", body);
    const { success, data: response } = data;
    if (success) {
      dispatch(loaderOff());
      return true;
    }
  } catch (error) {
    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};

export const validateUserName = (body) => async (dispatch) => {
  try {
    const { data } = await postApi("/validate", body);
    const { success, data: response } = data;
    if (success) {
      dispatch({ type: USER_NAME, payload: response });
      dispatch(loaderOff());
      return response.status;
    }
  } catch (error) {
    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};

export const otpLogin = (body) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const { data } = await postApi("/EmailconfirmOTP", body);
    const { success, data: response } = data;
    setTokens({
      user: null,
      token: response.token,
      refreshToken: response.refreshToken,
    });
    if (success) {
      dispatch({ type: LOGIN_OTP, payload: response });
      dispatch(loaderOff());
      return true;
    }
  } catch (error) {
    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};

export const resendOtp = (body) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const { data } = await postApi("/emailOTP", body);
    const { success, data: response } = data;
    if (success) {
      dispatch({ type: RESEND_OTP, payload: response });
      dispatch(loaderOff());
      return true;
    }
  } catch (error) {
    await errorHandler(error);
    dispatch(loaderOff());
    return false;
  }
};



export const getUserWithPermission = (id) => async (dispatch) => {
  try {

    const response = await getApi(`/user/getUserPermissions/${id}`)

    dispatch({
      type: SET_PERMISSIONS,
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Failed to set permissions:", error);
    dispatch({
      type: SET_PERMISSIONS,
      payload: [],
    });
  }
};

