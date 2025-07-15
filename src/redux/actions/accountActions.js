import { postApi, putApi, getApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import { loaderOn, loaderOff } from "@actions/loaderAction";
import {

  ACCOUNTS_LEDGER_OPTIONS_LOADED,
  ACCOUNTS_LEDGER_OPTIONS_CLEAR,
} from "@root/redux/types.js";

export const getLedgerOptions = (fieldType, params = {}) => async (dispatch) => {

  try {
    if (!params.is_group) {
      params.is_group = false;
    }
    const response = await getApi("/accounts/ledger", "", params); // Full query params
    if (response.status === 200) {
      dispatch({
        type: ACCOUNTS_LEDGER_OPTIONS_LOADED,
        payload: { fieldType, options: response.data },
      });
      return response.data;
    }
  } catch (error) {
    errorHandler(error);
  }

};
export const clearLedgerOptions = () => (dispatch) => {
  dispatch({ type: ACCOUNTS_LEDGER_OPTIONS_CLEAR });
};


export const getLedgerBalance = (ledgerId) => async () => {
  try {
  
    const response = await getApi(`/accounts/ledger/getLedgerBalance/${ledgerId}`);
  
    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
    console.error("Error fetching ledger balance", error);
    return null;
  }
};

