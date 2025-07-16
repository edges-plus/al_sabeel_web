import { CUSTOMERS_LOADED, UPDATE_CUSTOMER_PARAMS } from "@root/redux/types";

const initialState = {
  customers: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    count: 0,
    search: "",
  },
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_LOADED:
      return {
        ...state,
        customers: action.payload.data,
        params: {
          ...state.params,
          count: action.payload.count,
        },
      };
    case UPDATE_CUSTOMER_PARAMS:
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

export default customerReducer;

