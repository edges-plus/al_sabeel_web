import { LOADER_ON, LOADER_OFF } from "@root/redux/types.js";

export const loaderOn = () => async (dispatch) => {
  dispatch({ type: LOADER_ON });
};

export const loaderOff = () => async (dispatch) => {
  dispatch({ type: LOADER_OFF });
};

