import { getApi, postApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORY_CREATED,
  SERVICE_CATEGORY_UPDATED,
  UPDATE_SERVICE_CATEGORY_PARAMS,
} from "@root/redux/types";
import { loaderOn, loaderOff } from "./loaderAction";

export const getServiceCategories =
  (params = {}) =>
  async (dispatch) => {
    dispatch(loaderOn());
    try {
      delete params.count;
      const response = await getApi("/service-category", "", params);
      if (response.status === 200) {
        dispatch({
          type: SERVICE_CATEGORIES_LOADED,
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

export const createServiceCategory = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/service-category/create", data);
    if (response.status === 200) {
      dispatch({
        type: SERVICE_CATEGORY_CREATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateServiceCategory = (id, data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi(
      `/service-category/update/${id}`,
      data,
      "PUT"
    );
    if (response.status === 200) {
      dispatch({
        type: SERVICE_CATEGORY_UPDATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateServiceCategoryParams = (params) => (dispatch) => {
  dispatch({
    type: UPDATE_SERVICE_CATEGORY_PARAMS,
    payload: params,
  });
};
