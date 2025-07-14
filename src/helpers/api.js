import axios from "@root/axios.js";

export const getApi = async (url, id = "", params = {}) =>
  axios.get(url + "/" + id, { params });

export const putApi = async (url, body = {}) => axios.put(url, body);

export const postApi = async (url, body = {}) => axios.post(url, body);

export const deleteApi = async (url, id) => axios.delete(url + "/" + id);

export const deleteWithParamApi = async (url, params = {}) =>
  axios.delete(url, { params });

