import { getApi } from "@helpers/api";
import { loaderOn, loaderOff } from "@actions/loaderAction";
import { CUSTOMERS_LOADED, UPDATE_CUSTOMER_PARAMS } from "@root/redux/types";
import { errorHandler } from "@helpers/errorHandlers";

// Dummy data
const dummyCustomers = [
  {
      id: 1,
      customerType: "Institutional",
      companyName: "Emirates Holdings",
      contactPerson: "Mohammed Al Fahim",
      address: "Sheikh Zayed Road, Dubai",
      phone: "+971 50 123 4567",
    },
    {
      id: 2,
      customerType: "B2B",
      companyName: "Abu Dhabi Traders LLC",
      contactPerson: "Fatima Al Mansoori",
      address: "Hamdan Street, Abu Dhabi",
      phone: "+971 55 987 6543",
    },
    {
      id: 3,
      customerType: "Individual",
      companyName: "Desert Solutions",
      contactPerson: "Omar Bin Rashid",
      address: "King Faisal Street, Sharjah",
      phone: "+971 52 345 6789",
    },
    {
      id: 4,
      customerType: "Institutional",
      companyName: "Dubai Maritime Authority",
      contactPerson: "Layla Al Qasimi",
      address: "Port Rashid, Dubai",
      phone: "+971 56 223 1144",
    },
    {
      id: 5,
      customerType: "B2B",
      companyName: "Ajman Steel Co.",
      contactPerson: "Salem Al Nuaimi",
      address: "Industrial Area, Ajman",
      phone: "+971 58 776 8899",
    },
    {
      id: 6,
      customerType: "Individual",
      companyName: "Falcon Tech Services",
      contactPerson: "Zainab Al Suwaidi",
      address: "Khalid Bin Al Waleed Street, Dubai",
      phone: "+971 50 667 7788",
    },
];

export const updateCustomerParams = (params) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER_PARAMS,
    payload: params,
  });
};

export const getCustomers = (params) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    // const response = await getApi("/crm/getCustomers", "", params);
    // if (response.status === 200) {
    //   dispatch({
    //     type: CUSTOMERS_LOADED,
    //     payload: {
    //       data: response.data.data,
    //       count: response.data.count || 0,
    //     },
    //   });
    // }

    const search = (params.search || "").toLowerCase();
    const filtered = dummyCustomers.filter(
      (c) =>
        c.customerType.toLowerCase().includes(search) ||
        c.companyName.toLowerCase().includes(search) ||
        c.contactPerson.toLowerCase().includes(search) ||
        c.phone.includes(search)
    );

    const start = (params.page - 1) * params.rowsPerPage;
    const end = start + params.rowsPerPage;
    const paginated = filtered.slice(start, end);

    dispatch({
      type: CUSTOMERS_LOADED,
      payload: {
        data: paginated,           
        count: filtered.length,    
      },
    });

    dispatch(loaderOff());
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};

export const createCustomer = (customerData) => async (dispatch) => {


  dispatch(loaderOn());

  try {


    const response = await postApi("/sales/createCustomer", customerData);


    if (response.status === 200) {
      dispatch(loaderOff());
      getCustomers();
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());


    errorHandler(error);
  }
};

export const updateCustomer = (id, customerData) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    const response = await putApi(`/sales/updateCustomer/${id}`, customerData);

    if (response.status === 200) {
      dispatch(loaderOff());
      return response.data;
    }
  } catch (error) {
    dispatch(loaderOff());
    errorHandler(error);
  }
};
