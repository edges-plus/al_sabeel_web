import { getApi, postApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  INVOICES_LOADED,
  UPDATE_INVOICE_PARAMS,
  INVOICE_CREATED,
  INVOICE_UPDATED,
} from "@root/redux/types";
import { loaderOn, loaderOff } from "./loaderAction";

export const getInvoices =
  (params = {}) =>
    async (dispatch) => {
      dispatch(loaderOn());
      try {
        delete params.count;
        const response = await getApi("/accounts/invoice", "", params);
        if (response.status === 200) {
          dispatch({
            type: INVOICES_LOADED,
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

export const createInvoice = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/invoice/create", data);
    if (response.status === 200) {
      dispatch({
        type: INVOICE_CREATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateInvoice = (id, data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi(`/invoice/update/${id}`, data, "PUT");
    if (response.status === 200) {
      dispatch({
        type: INVOICE_UPDATED,
        payload: response.data,
      });
    }
  } catch (err) {
    errorHandler(err);
  }
  dispatch(loaderOff());
};

export const updateInvoiceParams = (params) => (dispatch) => {
  dispatch({
    type: UPDATE_INVOICE_PARAMS,
    payload: params,
  });
};

