import {
  INVOICES_LOADED,
  UPDATE_INVOICE_PARAMS,
  INVOICE_CREATED,
  INVOICE_UPDATED,
} from "@root/redux/types";

const initialState = {
  invoices: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    count: 0,

  },
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVOICES_LOADED:
      return {
        ...state,
        invoices: action.payload.data,
        params: {
          ...state.params,
          count: action.payload.count,
        },
      };
    case INVOICE_CREATED:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };
    case INVOICE_UPDATED:
      return {
        ...state,
        invoices: state.invoices.map((inv) =>
          inv.id === action.payload.id ? action.payload : inv
        ),
      };
    case UPDATE_INVOICE_PARAMS:
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

export default invoiceReducer;

