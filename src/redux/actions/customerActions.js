import { getApi,postApi ,putApi} from "@helpers/api";
import { loaderOn, loaderOff } from "@actions/loaderAction";
import { CUSTOMERS_LOADED, UPDATE_CUSTOMER_PARAMS } from "@root/redux/types";
import { errorHandler } from "@helpers/errorHandlers";
import { toast } from "react-toastify";


export const updateCustomerParams = (params) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER_PARAMS,
    payload: params,
  });
};

export const getCustomers = (params) => async (dispatch) => {
  dispatch(loaderOn());
  try {

    
    const response = await getApi("/crm/customers", "", params);
  
    if (response.status === 200) {
      dispatch({
        type: CUSTOMERS_LOADED,
        payload: {
          data: response.data.data,
          count: response.data.count || 0,
        },
      });
    }

    dispatch(loaderOff());
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const createCustomer = (customerData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
 
    const response = await postApi("/crm/create-customer", customerData);
    if (response.status === 200) {
      dispatch(loaderOff());
      getCustomers();
      toast.success("customer created successfully");  
      return 
    }
  } catch (error) {
    dispatch(loaderOff());


    errorHandler(error);
  }
};

export const updateCustomer = (id, customerData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await putApi(`/crm/update-customer/${id}`, customerData);

    if (response.status === 200) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const getCustomer = (id) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await getApi(`/crm/customer/${id}`);
        if (response.status === 200) {
            dispatch(loaderOff());
 
            return response.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};
