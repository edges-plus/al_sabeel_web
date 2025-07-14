import { combineReducers } from "redux";
import authReducer from "@root/redux/reducers/authReducer";
import loaderReducer from "@root/redux/reducers/loaderReducer";







export default combineReducers({

  auth: authReducer,
  loaderReducer,




});


