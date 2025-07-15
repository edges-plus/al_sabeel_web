import {
  UPDATE_LEDGER_GROUP_FORM_FIELD,
  RESET_LEDGER_GROUP_FORM,

  UNDER_GROUPS_LOADED,
  UNDER_GROUPS_CLEAR,
  UPDATE_FORM_FIELD_TYPE,
  SET_LEDGER_TREE,
  ADD_LEDGER_CHILDREN,
  SET_LOADING_NODE
} from "@root/redux/types.js";


const initialState = {
  treeData: [],
  loadedNodeIds: [],
  loadingNodes: [],

  formData: {
    code: '',
    ledgerName: '',
    under: null,
    type: '',
    financialStatement: '',
    group_type: null,
    selectedGroupType: null,
    currency: 'AED',
    conversionRate: '1',
  },

  // Options for autocomplete fields
  underOptions: [], // Will be populated from API

  // Type options - fixed values
  typeOptions: [
    'Asset',
    'Liability',
    'Revenue',
    'Expense',
  ],

  // Group type options - only applicable for Revenue and Expense
  groupTypeOptions: [
    'Direct',
    'Indirect',
  ],
};
const insertChildren = (nodes, parentId, children) =>
  nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, children };
    }
    if (node.children) {
      return { ...node, children: insertChildren(node.children, parentId, children) };
    }
    return node;
  });
const ledgerGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEDGER_TREE:
      return { ...state, treeData: action.payload };

    case ADD_LEDGER_CHILDREN:
      return {
        ...state,
        treeData: insertChildren(state.treeData, action.payload.parentId, action.payload.children),
        loadedNodeIds: [...state.loadedNodeIds, action.payload.parentId],
        loadingNodes: state.loadingNodes.filter(id => id !== action.payload.parentId)
      };

    case SET_LOADING_NODE:
      return {
        ...state,
        loadingNodes: [...state.loadingNodes, action.payload]
      };
    case UNDER_GROUPS_LOADED:
      return {
        ...state,
        underOptions: action.payload,
      };
    case UPDATE_FORM_FIELD_TYPE:
      {
        if (state.formData.under !== null) {
          return state;
        }
        let value = action.payload.value;
        let field = "type";
        let updatedState = {
          ...state,
          formData: {
            ...state.formData,
            [field]: value,
          }
        };
        let financialStatement = '';
        if (value === 'Asset' || value === 'Liability') {
          financialStatement = 'Balance Sheet';
        } else if (value === 'Revenue' || value === 'Expense') {
          financialStatement = 'Profit & Loss';
        }
        updatedState.formData.financialStatement = financialStatement;

        updatedState.formData.group_type = null;



        return updatedState;
      }



    case UPDATE_LEDGER_GROUP_FORM_FIELD:
      {


        let updatedState = {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.field]: action.payload.value,
          },
        };


        if (action.payload.field === 'under') {
          if (action.payload.value) {
            updatedState.formData.under = action.payload.value;
            updatedState.formData.parent_id = action.payload.value.name;
            updatedState.formData.type = action.payload.value.type;
            updatedState.formData.financialStatement = action.payload.value.financial_statement;
            updatedState.formData.group_type = action.payload.value.group_type;

          } else {
            updatedState.formData.under = null;
            updatedState.formData.parent_id = null;

          }
        }


        return updatedState;
      }

    case UNDER_GROUPS_CLEAR:
      return {
        ...state,
        underOptions: [],
      };
    // Reset form to initial state
    case RESET_LEDGER_GROUP_FORM:
      return {
        ...state,
        formData: {
          ...state.formData,
          code: '',
          ledgerName: '',
          under: null,
          selectedUnder: null,
          type: '',
          selectedType: null,
          financialStatement: '',
          group_type: null,
          selectedGroupType: null,
        },
      };

    default:
      return state;
  }
};

export default ledgerGroupReducer;
