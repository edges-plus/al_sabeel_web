import { loaderOn, loaderOff } from "@actions/loaderAction";
import { getApi, postApi, putApi } from "@helpers/api";
import { toast } from "react-toastify";

// Dummy crew list
const dummyCrews = [
  {
    id: 1,
    employeeNo: "CLN001",
    name: "Mohammed Ali",
    jobTitle: "Cleaning Supervisor",
    department: "Operations",
    email: "m.ali@cleanuae.com",
    phone: "0501234567",
  },
  {
    id: 2,
    employeeNo: "CLN002",
    name: "Fatima Khan",
    jobTitle: "Housekeeping Staff",
    department: "Residential Cleaning",
    email: "f.khan@cleanuae.com",
    phone: "0529876543",
  },
  {
    id: 3,
    employeeNo: "CLN003",
    name: "Ramesh Kumar",
    jobTitle: "Cleaning Staff",
    department: "Commercial Cleaning",
    email: "r.kumar@cleanuae.com",
    phone: "0561122334",
  },
  {
    id: 4,
    employeeNo: "CLN004",
    name: "Aisha Al Mansoori",
    jobTitle: "Team Leader",
    department: "Deep Cleaning",
    email: "a.mansoori@cleanuae.com",
    phone: "0559988776",
  },
  {
    id: 5,
    employeeNo: "CLN005",
    name: "Joseph Mathew",
    jobTitle: "Driver",
    department: "Logistics",
    email: "j.mathew@cleanuae.com",
    phone: "0586655443",
  },
];


let crewParams = {
  search: "",
  page: 1,
  rowsPerPage: 5,
  count: dummyCrews.length,
};

export const updateCrewParams = (params) => (dispatch) => {
  crewParams = params;
  dispatch({ type: "CREW_PARAMS_UPDATED", payload: params }); // No reducer needed
};

export const getCrews = (params) => async (dispatch) => {
  dispatch(loaderOn());

  try {
    let filtered = [...dummyCrews];

    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.jobTitle.toLowerCase().includes(s) ||
          c.department.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          c.phone.includes(s) ||
          c.employeeNo.toLowerCase().includes(s)
      );
    }

    const start = (params.page - 1) * params.rowsPerPage;
    const end = start + params.rowsPerPage;
    const paginated = filtered.slice(start, end);

    return {
      data: paginated,
      params: {
        ...params,
        count: filtered.length,
      },
    };
  } catch (error) {
    console.error("Error loading crews", error);
    return { data: [], params };
  } finally {
    dispatch(loaderOff());
  }
};

// 🔁 When real API is ready:
// export const getCrews = (params) => async (dispatch) => {
//   dispatch(loaderOn());
//   try {
//     const response = await getApi("/crews", "", params);
//     return response.data;
//   } catch (error) {
//     console.error("API Error", error);
//     throw error;
//   } finally {
//     dispatch(loaderOff());
//   }
// };


export const createCrew = (crewData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // Replace with actual API later
    const response = await postApi("/crew/createCrew", crewData);
    toast.success("Crew created successfully");
    return response.data;
  } catch (error) {
    console.error("Create Crew Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};

export const getCrewById = (crewId) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // Replace with actual API later
    const response = await getApi(`/crew/${crewId}`);
    return { data: response.data };
  } catch (error) {
    console.error("Get Crew Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};

export const updateCrew = (crewId, updatedData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // Replace with actual API later
    const response = await putApi(`/crew/update/${crewId}`, updatedData);
    toast.success("Crew updated successfully");
    return response.data;
  } catch (error) {
    console.error("Update Crew Error:", error.message);
    throw error;
  } finally {
    dispatch(loaderOff());
  }
};

