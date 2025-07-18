import { loaderOn, loaderOff } from "@actions/loaderAction";
import { getApi,postApi,putApi } from "@helpers/api";
import { toast } from "react-toastify";


// Dummy user list
const dummyUsers = [
  { id: 1, name: "Alice Johnson", role: "Admin", email: "alice@example.com", phone: "9876543210" },
  { id: 2, name: "Bob Smith", role: "Manager", email: "bob@example.com", phone: "9123456789" },
  { id: 3, name: "Charlie Davis", role: "Operator", email: "charlie@example.com", phone: "9988776655" },
  { id: 4, name: "David Lee", role: "Admin", email: "david@example.com", phone: "9234567890" },
  { id: 5, name: "Eva Green", role: "Viewer", email: "eva@example.com", phone: "9567890123" },
  { id: 6, name: "Frank Wright", role: "Operator", email: "frank@example.com", phone: "9012345678" },
];


export const updateUserParams = (params) => (dispatch) => {
  userParams = params;
  dispatch({ type: "USER_PARAMS_UPDATED", payload: params }); 
};

export const getUsers = (params) => async (dispatch) => {
  dispatch(loaderOn());

  try {
    // Simulate API call (you can later replace this with: await getApi("/users", "", params))
    let filtered = [...dummyUsers];

    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.role.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.phone.includes(s)
      );
    }

    const start = (params.page - 1) * params.rowsPerPage;
    const end = start + params.rowsPerPage;
    const paginated = filtered.slice(start, end);

    dispatch({
      type: "USERS_LOADED", // No reducer needed, just return from dispatch
      payload: {
        users: paginated,
        params: {
          ...params,
          count: filtered.length,
        },
      },
    });

    return {
      data: paginated,
      params: {
        ...params,
        count: filtered.length,
      },
    };
  } catch (error) {
    console.error("Error loading users", error);
    return { data: [], params };
  } finally {
    dispatch(loaderOff());
  }
};


export const createUser = (userData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // 🔁 Replace this line with actual API when ready
    const response = await postApi("/user/createUser", userData);

    toast.success("User created successfully");
    return response.data;
  } catch (error) {
    console.error("Create User Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};

export const getUserById = (userId) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // 🔁 Replace this line with actual API when ready
    const response = await getApi(`/users/${userId}`);

    return { data: response.data };
  } catch (error) {
    console.error("Get User Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};

export const updateUser = (userId, updatedData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // 🔁 Replace this line with actual API when ready
    const response = await putApi(`/users/update/${userId}`, updatedData);

    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    console.error("Update User Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};