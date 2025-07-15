import { postApi, getApi, putApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
  UPDATE_LEDGER_GROUP_FORM_FIELD,
  RESET_LEDGER_GROUP_FORM,

  UNDER_GROUPS_LOADED,
  UNDER_GROUPS_CLEAR,
  UPDATE_FORM_FIELD_TYPE,
  SET_LEDGER_TREE,
  ADD_LEDGER_CHILDREN,
  SET_LOADING_NODE
} from "@root/redux/types.js";

import { loaderOn, loaderOff } from "@actions/loaderAction";


export const fetchLedgerTree = () => async (dispatch) => {
  const res = await getApi('/accounts/ledger/tree');
  dispatch({ type: SET_LEDGER_TREE, payload: res.data });
};

export const fetchLedgerChildren = (parentId) => async (dispatch) => {
  dispatch({ type: SET_LOADING_NODE, payload: parentId });

  const res = await getApi(`/accounts/ledger/children/${parentId}`);
  dispatch({
    type: ADD_LEDGER_CHILDREN,
    payload: { parentId, children: res.data }
  });
};
export const createLedgerGroup = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await postApi("/accounts/ledger", data);
    if (response.status === 201) {
      dispatch(resetLedgerGroupForm());
    }
    dispatch(loaderOff());
    return response;
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};
export const updateLedger = (data) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await putApi(`/accounts/ledger/${data.id}`, data);
    if (response.status === 201) {
      dispatch(resetLedgerGroupForm());
    }
    dispatch(loaderOff());
    return response;
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const initFromParent = (parent_id) => async (dispatch) => {
  dispatch(loaderOn());
  const response = await getApi(`/accounts/ledger/${parent_id}`);
  if (response.status === 200) {
    dispatch(loaderOff());
    const parentData = response.data;


    dispatch(genNextLedgerCode(parentData.type));

    dispatch({
      type: UPDATE_LEDGER_GROUP_FORM_FIELD,
      payload: { field: "under", value: parentData },
    });
  } else {
    dispatch(loaderOff());
    errorHandler(response);
  }
};
export const initEditLedger = (id) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await getApi(`/accounts/ledger/${id}`);
    if (response.status === 200) {
      const data = response.data;



      dispatch({
        type: UPDATE_LEDGER_GROUP_FORM_FIELD,
        payload: { field: "code", value: data["code"] },
      });
      dispatch({
        type: UPDATE_LEDGER_GROUP_FORM_FIELD,
        payload: { field: "ledgerName", value: data["name"] },
      });
      dispatch({
        type: UPDATE_LEDGER_GROUP_FORM_FIELD,
        payload: { field: "currency", value: data["currency"] },
      });
      dispatch({
        type: UPDATE_LEDGER_GROUP_FORM_FIELD,
        payload: { field: "conversionRate", value: data["conversion_rate"] || "1" },
      });
      if (data["parent_id"]) {
        dispatch(initFromParent(data["parent_id"]));
      } else {
        dispatch({
          type: UPDATE_LEDGER_GROUP_FORM_FIELD,
          payload: { field: "under", value: null },
        });
        dispatch({
          type: UPDATE_LEDGER_GROUP_FORM_FIELD,
          payload: { field: "parent_id", value: null },
        });
        dispatch({
          type: UPDATE_LEDGER_GROUP_FORM_FIELD,
          payload: { field: "type", value: data["type"] },
        });
        dispatch({
          type: UPDATE_LEDGER_GROUP_FORM_FIELD,
          payload: { field: "financialStatement", value: data["financial_statement"] },
        });
        dispatch({
          type: UPDATE_LEDGER_GROUP_FORM_FIELD,
          payload: { field: "group_type", value: data["group_type"] },
        });

      }


    }
    dispatch(loaderOff());
    return response;
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};



// Update a single field in the form
export const updateFormField = (field, value) => async (dispatch) => {
  if (field === "under") {
    if (value) {
      dispatch(genNextLedgerCode(value.type));

    }

  }
  dispatch({
    type: UPDATE_LEDGER_GROUP_FORM_FIELD,
    payload: { field, value },
  });
};
export const updateFormFieldType = (value) => async (dispatch) => {

  dispatch(genNextLedgerCode(value));

  dispatch({
    type: UPDATE_FORM_FIELD_TYPE,
    payload: { value },
  });
};
export const updateUnderGroup = (under) => async (dispatch) => {


  dispatch(genNextLedgerCode(under.type));
  dispatch({
    type: UPDATE_LEDGER_GROUP_FORM_FIELD,
    payload: { field: "under", value: under },
  });
};
export const genNextLedgerCode = (type) => async (dispatch) => {

  try {





    const response = await getApi("/accounts/ledger/next-code", "", { "type": type });
    if (response.status === 200) {

      dispatch({
        type: UPDATE_LEDGER_GROUP_FORM_FIELD,
        payload: { field: "code", value: response.data.nextCode },
      });

    }
  } catch (error) {

    errorHandler(error);
  }
};



// Fetch under groups from the backend
export const fetchUnderGroups = (params) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await getApi("/accounts/ledger", "", { "search": params, "is_group": true });
    if (response.status === 200) {
      dispatch(loaderOff());
      dispatch({
        type: UNDER_GROUPS_LOADED,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};
export const clearUnderGroups = () => ({
  type: UNDER_GROUPS_CLEAR,
});
// Reset form to initial state
export const resetLedgerGroupForm = () => ({
  type: RESET_LEDGER_GROUP_FORM,
});


