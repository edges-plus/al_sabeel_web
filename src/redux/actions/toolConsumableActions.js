import {
  TOOL_CONSUMABLES_LOADED,
  UPDATE_TOOL_CONSUMABLE_PARAMS,
} from "@root/redux/types";
import { getApi } from "@helpers/api"; 
import { loaderOn, loaderOff } from "./loaderAction";

export const getToolConsumables = (params) => async (dispatch) => {
  dispatch(loaderOn());

  try {
    // const response = await getApi("/tools-consumables", params);
    const mockData = [
  {
    id: 1,
    name: "Hammer",
    type: "Tool",
    sku: "T001",
    description: "Heavy-duty steel hammer",
  },
  {
    id: 2,
    name: "Gloves",
    type: "Consumable",
    sku: "C001",
    description: "Safety gloves for handling",
  },
  {
    id: 3,
    name: "Screwdriver Set",
    type: "Tool",
    sku: "T002",
    description: "Set of 6 precision screwdrivers",
  },
];

       const filtered = mockData.filter(item =>
      item.name.toLowerCase().includes(params.search.toLowerCase()) ||
      item.type.toLowerCase().includes(params.search.toLowerCase()) ||
      item.sku.toLowerCase().includes(params.search.toLowerCase())
    );

    dispatch({ type: TOOL_CONSUMABLES_LOADED, payload: { data: filtered, count: filtered.length } });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(loaderOff());
  }
};

export const updateToolConsumableParams = (params) => ({
  type: UPDATE_TOOL_CONSUMABLE_PARAMS,
  payload: params,
});

