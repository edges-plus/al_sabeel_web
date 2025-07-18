import {
  TOOL_CONSUMABLES_LOADED,
  UPDATE_TOOL_CONSUMABLE_PARAMS,
} from "@root/redux/types";
import { getApi,putApi,postApi } from "@helpers/api"; 
import { loaderOn, loaderOff } from "./loaderAction";
import { errorHandler } from "@helpers/errorHandlers";
export const getToolConsumables = (params) => async (dispatch) => {
  dispatch(loaderOn());

  try {
 

    const response = await getApi("/service-management/tool&consumables", "", params);
    if (response.status === 200) {
    dispatch(loaderOff());
    
       return response.data
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(loaderOff());
  }
};


export const createToolAndConsumable = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/service-management/create-tool&consumables", data); 
    loaderOff()
    if (response.status === 200) {
      
      return
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateToolAndConsumables = (id, data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
 
    
    const response = await putApi(
      `/service-management/tool&consumables/${id}`,
      data,
      "PUT"
    );

    if (response.status === 200) { 
    dispatch(loaderOff())
return
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const getToolConsumablesById = (id) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await getApi(`/service-management/tool&consumables/${id}`);
        if (response.status === 200) {
            dispatch(loaderOff());
 
            return response.data.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};
