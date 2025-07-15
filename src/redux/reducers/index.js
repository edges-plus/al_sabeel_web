import { combineReducers } from "redux";
import authReducer from "@root/redux/reducers/authReducer";
import loaderReducer from "@root/redux/reducers/loaderReducer";
import ledgerReducer from "@root/redux/reducers/ledgerReducer";
import accountReducer from "@root/redux/reducers/accountReducer";
import journalEntryReducer from "@root/redux/reducers/journalEntry.reducer";







export default combineReducers({

  auth: authReducer,
  loaderReducer,
  ledger: ledgerReducer,
  account: accountReducer,
  journalEntry: journalEntryReducer,




});


