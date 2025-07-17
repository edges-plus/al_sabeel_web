import {
  TOOL_CONSUMABLES_LOADED,
  UPDATE_TOOL_CONSUMABLE_PARAMS,
} from "@root/redux/types";

const initialState = {
  toolConsumables: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    search: "",
    count: 0,
  },
};

const toolConsumableReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOL_CONSUMABLES_LOADED:
      return {
        ...state,
        toolConsumables: action.payload.data,
        params: { ...state.params, count: action.payload.count },
      };
    case UPDATE_TOOL_CONSUMABLE_PARAMS:
      return {
        ...state,
        params: { ...state.params, ...action.payload },
      };
    default:
      return state;
  }
};

export default toolConsumableReducer;

