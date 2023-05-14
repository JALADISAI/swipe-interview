import {
  invoiceFormBulkFeildsUpdate,
  invoiceFormFieldValue,
  invoiceFormItems,
  invoiceFormReset,
  invoiceFormRED,
  invoiceFormToggleFlag,
} from "../types";

const initialState = {
  formValues: {
    isOpen: false,
    currency: "$",
    currentDate: "",
    invoiceNumber: "",
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    total: "1.00",
    subTotal: "1.00",
    taxRate: "",
    taxAmmount: "0.00",
    discountRate: "",
    discountAmount: "0.00",
  },
  items: [
    {
      id: "1",
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ],
  toggleFlags: {
    isView: false,
    isCopy: false,
    isEdit: false,
  },
};

export default function invoiceFormReducer(state = initialState, action) {
  switch (action.type) {
    case invoiceFormFieldValue: {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.data.key]: action.data.value,
        },
      };
    }
    case invoiceFormItems: {
      return {
        ...state,
        items: action.items || [],
      };
    }
    case invoiceFormBulkFeildsUpdate: {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.data,
        },
      };
    }
    case invoiceFormRED: {
      return {
        ...state,
        formValues: action.row.data,
        items: action.row.items,
        toggleFlags: {
          ...state.toggleFlags,
          isView: action.isView,
          isEdit: action.isEdit,
          isCopy: action.isCopy,
        },
      };
    }
    case invoiceFormToggleFlag: {
      return {
        ...state,
        toggleFlags: {
          ...state.toggleFlags,
          [action.data.key]: action.data.value,
        },
      };
    }
    case invoiceFormReset: {
      return initialState;
    }
    default:
      return state;
  }
}
