import {
  invoiceFormBulkFeildsUpdate,
  invoiceFormFieldValue,
  invoiceFormItems,
} from "../types";

const initialState = {
  formValues: {
    isOpen: false,
    currency: "$",
    currentDate: "",
    invoiceNumber: 1,
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
    discountAmmount: "0.00",
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
    default:
      return state;
  }
}
