import {
  ACCOUNTS_LEDGER_OPTIONS_LOADED,
  ACCOUNTS_LEDGER_OPTIONS_CLEAR,
} from "@root/redux/types";

const initialState = {
  fromOptions: [],
  toOptions: [],
  paymentModeOptions: [],
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNTS_LEDGER_OPTIONS_LOADED:


      return {
        ...state,
        [`${action.payload.fieldType}Options`]:
          action.payload.options,
      };

    case ACCOUNTS_LEDGER_OPTIONS_CLEAR:
      return {
        ...state,
        fromOptions: [],
        toOptions: [],
        cashOptions: [],
      };

    default:
      return state;
  }
};

export default accountsReducer;

