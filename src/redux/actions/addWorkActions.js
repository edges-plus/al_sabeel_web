import { postApi, getApi, putApi, deleteApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import { loaderOn, loaderOff } from "@actions/loaderAction";

export const createWorkEntry = (workData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/work", workData);
    if (response.status === 201) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const fetchWorkEntries = () => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await getApi("/work");
    if (response.status === 200) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const updateWorkEntry = (id, updatedData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await putApi(`/work/${id}`, updatedData);
    if (response.status === 200) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const deleteWorkEntry = (id) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await deleteApi(`/work/${id}`);
    if (response.status === 200) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};
