import { getApi, postApi,putApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  SERVICE_GROUPS_LOADED,
  SERVICE_GROUP_CREATED,
  SERVICE_GROUP_UPDATED,
  UPDATE_SERVICE_GROUP_PARAMS,
} from "@root/redux/types";
import { loaderOn, loaderOff } from "./loaderAction";

export const getServices = (params = {}) => async (dispatch) => {


    dispatch(loaderOn());
    try {
      const response = await getApi("/service-management/services", "", params);
   
    dispatch(loaderOff())
      if (response.status === 200) {
       
       return response.data
      }
    } catch (err) {
      errorHandler(err);
    }
    dispatch(loaderOff());
  };

export const createService = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
  
    
    const response = await postApi("/service-management/create-service", data);
   
    
    if (response.status === 200) {
 
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateService= (id, data) => async (dispatch) => {
  dispatch(loaderOn());

  try {

    const response = await putApi(`/service-management/service/${id}`, data);

    if (response.status === 200) {
    dispatch(loaderOff());
       return
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const getService = (id) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await getApi(`/service-management/service/${id}`);
        if (response.status === 200) {
            dispatch(loaderOff());
 
            return response.data.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};
