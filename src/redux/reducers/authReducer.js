import { LOGIN, LOGOUT, SET_PERMISSIONS } from "@root/redux/types.js";
import { getUser, isAuthenticated } from "@helpers/localStorage";

const initialState = {
  user: getUser() ? JSON.parse(getUser()) : null,
  isLoggedIn: isAuthenticated(),
  permissions: []

};

export default function (state = initialState, action) {

  switch (action.type) {

    case LOGIN:


      return {

        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        permissions: [],

      };
    case SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload || [],
      };
    default:
      return state;
  }
}
