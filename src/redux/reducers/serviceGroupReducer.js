import {
  SERVICE_GROUPS_LOADED,
  UPDATE_SERVICE_GROUP_PARAMS,
  SERVICE_GROUP_UPDATED,
} from "../types";

const initialState = {
  data: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    search: "",
    count: 0,
  },
};

const serviceGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_GROUPS_LOADED:
      return {
        ...state,
        data: action.payload.data,
        params: {
          ...state.params,
          count: action.payload.count,
        },
      };
    case UPDATE_SERVICE_GROUP_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case SERVICE_GROUP_UPDATED:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export default serviceGroupReducer;
