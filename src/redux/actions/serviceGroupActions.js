import { getApi, postApi ,putApi} from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import { loaderOn, loaderOff } from "./loaderAction";

export const getServiceGroups =
  (params = {}) =>
  async (dispatch) => {
    dispatch(loaderOn());
    try {
      delete params.count;
      const response = await getApi("/service-management/service-groups", "", params);
   
   dispatch(loaderOff());
          if (response.status === 200) {
       return response.data.data
      }
   
    } catch (err) {
      errorHandler(err);
    }
    dispatch(loaderOff());
  };

export const createServiceGroup = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/service-management/create-service-group", data);
    if (response.status === 200) {
      getServiceCategories()
      return
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateServiceGroup = (id, data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await putApi(
      `/service-management/service-group/${id}`,
      data,
      "PUT"
    );
    if (response.status === 200) { 
    
return
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

