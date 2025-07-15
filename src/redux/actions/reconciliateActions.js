import { postApi, getApi, putApi } from "@helpers/api";
import { errorHandler } from "@helpers/errorHandlers";
import { loaderOn, loaderOff } from "@actions/loaderAction";
export const getBanks = (params) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await getApi("/accounts/reconciliation/getBanks", "", {
      page: params.page || 1,
      rowsPerPage: params.rowsPerPage || 10,
      search: params?.search || "",
      sort: params.sort || "",
      order: params.order || "DESC",
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    errorHandler(error);
  } finally {
    dispatch(loaderOff());
  }
};

export const getBankTransactions = (id) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await getApi(
      `/accounts/reconciliation/getBankReconciliations/${id}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    errorHandler(error);
  } finally {
    dispatch(loaderOff());
  }
};
export const handleReconcile = (journalLineIds) => async (dispatch) => {


  dispatch(loaderOn());
  try {
    const response = await putApi(
      `/accounts/reconciliation/reconcile/`,
      journalLineIds
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    errorHandler(error);
  } finally {
    dispatch(loaderOff());
  }
};

