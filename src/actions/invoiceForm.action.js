import {
  invoiceFormBulkFeildsUpdate,
  invoiceFormFieldValue,
  invoiceFormItems,
  invoiceFormReset,
  invoiceFormToggleFlag,
} from "../types";

export const handleFormFieldValue = (data) => {
  return {
    type: invoiceFormFieldValue,
    data,
  };
};

export const handleFormItems = (items) => {
  return {
    type: invoiceFormItems,
    items,
  };
};

export const handleFormBulkUpdate = (data) => {
  return {
    type: invoiceFormBulkFeildsUpdate,
    data,
  };
};

export const handleInvoiceFormReset = () => {
  return {
    type: invoiceFormReset,
  };
};

export const handleInvoiceFormToggleFlag = (data) => {
  return {
    type: invoiceFormToggleFlag,
    data,
  };
};
