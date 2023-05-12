import {
  invoiceFormBulkFeildsUpdate,
  invoiceFormFieldValue,
  invoiceFormItems,
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
