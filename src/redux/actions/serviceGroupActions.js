import { getApi, postApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  SERVICE_GROUPS_LOADED,
  SERVICE_GROUP_CREATED,
  SERVICE_GROUP_UPDATED,
  UPDATE_SERVICE_GROUP_PARAMS,
} from "@root/redux/types";
import { loaderOn, loaderOff } from "./loaderAction";

export const getServiceGroups =
  (params = {}) =>
  async (dispatch) => {
    dispatch(loaderOn());
    try {
      delete params.count;
      const response = await getApi("/service-group", "", params);
      if (response.status === 200) {
        dispatch({
          type: SERVICE_GROUPS_LOADED,
          payload: {
            data: response.data.rows,
            count: response.data.count,
          },
        });
      }
    } catch (err) {
      errorHandler(err);
    }
    dispatch(loaderOff());
  };

export const createServiceGroup = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/service-group/create", data);
    if (response.status === 200) {
      dispatch({
        type: SERVICE_GROUP_CREATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateServiceGroup = (id, data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi(`/service-group/update/${id}`, data, "PUT");
    if (response.status === 200) {
      dispatch({
        type: SERVICE_GROUP_UPDATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateServiceGroupParams = (params) => (dispatch) => {
  dispatch({
    type: UPDATE_SERVICE_GROUP_PARAMS,
    payload: params,
  });
};
