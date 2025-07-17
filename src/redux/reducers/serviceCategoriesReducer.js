import {
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORY_CREATED,
  SERVICE_CATEGORY_UPDATED,
  UPDATE_SERVICE_CATEGORY_PARAMS,
} from "@root/redux/types";

const initialState = {
  serviceCategories: [],
  params: {
    page: 1,
    rowsPerPage: 10,
    count: 0,
  },
};

const serviceCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_CATEGORIES_LOADED:
      return {
        ...state,
        serviceCategories: action.payload.data,
        params: {
          ...state.params,
          count: action.payload.count,
        },
      };
    case SERVICE_CATEGORY_CREATED:
      return {
        ...state,
        serviceCategories: [action.payload, ...state.serviceCategories],
      };
    case SERVICE_CATEGORY_UPDATED:
      return {
        ...state,
        serviceCategories: state.serviceCategories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case UPDATE_SERVICE_CATEGORY_PARAMS:
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

export default serviceCategoryReducer;
