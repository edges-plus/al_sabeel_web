import { LOADER_ON, LOADER_OFF } from "@root/redux/types.js";

const initialState = {
  loaderStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADER_ON:
      return {
        ...state,
        loaderStatus: true,
      };
    case LOADER_OFF:
      return {
        ...state,
        loaderStatus: false,
      };
    default:
      return state;
  }
}

