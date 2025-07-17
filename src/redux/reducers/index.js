import { combineReducers } from "redux";
import authReducer from "@root/redux/reducers/authReducer";
import loaderReducer from "@root/redux/reducers/loaderReducer";
import ledgerReducer from "@root/redux/reducers/ledgerReducer";
import accountReducer from "@root/redux/reducers/accountReducer";
import journalEntryReducer from "@root/redux/reducers/journalEntry.reducer";
import invoiceReducer from "@root/redux/reducers/invoiceReducer";
import customerReducer from "@root/redux/reducers/customerReducer";

import toolConsumableReducer from "@root/redux/reducers/toolConsumable.reducer";
import serviceCategoryReducer from "@root/redux/reducers/serviceCategoriesReducer";
import serviceGroupReducer from "@root/redux/reducers/serviceGroupReducer";


export default combineReducers({
  auth: authReducer,
  loaderReducer,
  ledger: ledgerReducer,
  account: accountReducer,
  journalEntry: journalEntryReducer,
  invoice: invoiceReducer,

  customer: customerReducer, 
  toolConsumable: toolConsumableReducer, 

  customer: customerReducer,
  serviceCategory: serviceCategoryReducer,
  serviceGroup: serviceGroupReducer,

});
