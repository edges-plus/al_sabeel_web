import {
  JOURNAL_ENTRIES_LOADED,
  UPDATE_JOURNAL_ENTRY_PARAMS,
} from "@root/redux/types";

const initialState = {
  entries: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    count: 0,
  },
};

const journalEntryReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOURNAL_ENTRIES_LOADED:
      return {
        ...state,
        entries: action.payload.data,
        params: {
          ...state.params,
          count: action.payload.total, // assuming backend sends total items
        },
      };

    case UPDATE_JOURNAL_ENTRY_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default journalEntryReducer;

