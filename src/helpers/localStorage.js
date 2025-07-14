export const setTokens = ({ user,branchId ,token, refreshToken }) => {
    localStorage.setItem("branchId", JSON.stringify(branchId));
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
};

export const removeTokens = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => localStorage.getItem("token");

export const getUser = () => localStorage.getItem("user");

export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));

export const getBranchId = () => {
  const id = localStorage.getItem("branchId");
  return id ? JSON.parse(id) : null;
};

export const setBranchId = (branchId) => localStorage.setItem("branchId", JSON.stringify(branchId));

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const isAuthenticated = () => {
  return getAccessToken() ? true : false;
};


