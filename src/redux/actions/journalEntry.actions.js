import { postApi, getApi, putApi,deleteApi} from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import {
    JOURNAL_ENTRIES_LOADED,
    UPDATE_JOURNAL_ENTRY_PARAMS,
} from "@root/redux/types";
import { loaderOn, loaderOff } from "@actions/loaderAction";

export const createJournalEntry = (entryData) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await postApi("/accounts/journal-entries", entryData);
        if (response.status === 201) {
            dispatch(loaderOff());

            return response.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};

export const updateJournalEntryParams = (params) => (dispatch) => {
    dispatch({
        type: UPDATE_JOURNAL_ENTRY_PARAMS,
        payload: params,
    });
};

// Get All Entries
export const getJournalEntries = (params = {}) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await getApi("/accounts/journal-entries", "", params);
        if (response.status === 200) {
            dispatch(loaderOff());
            dispatch({
                type: JOURNAL_ENTRIES_LOADED,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};

// Get Entry by ID
export const getJournalEntryById = (id) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await getApi(`/accounts/journal-entries/${id}`);
        if (response.status === 200) {
            dispatch(loaderOff());
            return response.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};

export const updateJournalEntry = (id, entryData) => async (dispatch) => {
    dispatch(loaderOn());
    try {
        const response = await putApi(`/accounts/journal-entries/${id}`, entryData);
        if (response.status === 200) {
            dispatch(loaderOff());
            dispatch(getJournalEntries());
            return response.data;
        }
    } catch (error) {
        dispatch(loaderOff());
        errorHandler(error);
    }
};

export const deleteJournalEntry = (id) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await deleteApi(`/accounts/journal-entries`,id);
    if (response.status === 200) {
      dispatch(loaderOff());
      return true;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
    return false;
  }
};
