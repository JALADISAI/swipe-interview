import { act } from "react-dom/test-utils";
import { invoiceFormFieldValue } from "../types";

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
    total: "0.00",
    subTotal: "0.00",
    taxRate: "",
    taxAmmount: "0.00",
    discountRate: "",
    discountAmmount: "0.00",
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
    default:
      return state;
  }
}
