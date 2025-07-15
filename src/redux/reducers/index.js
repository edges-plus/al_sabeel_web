import { combineReducers } from "redux";
import authReducer from "@root/redux/reducers/authReducer";
import loaderReducer from "@root/redux/reducers/loaderReducer";
import ledgerReducer from "@root/redux/reducers/ledgerReducer";







export default combineReducers({

  auth: authReducer,
  loaderReducer,
  ledger: ledgerReducer,





});


