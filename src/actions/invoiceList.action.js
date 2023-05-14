import {
  invoiceFormRED,
  invoiceListDeleteItem,
  invoiceListSaveItem,
} from "../types";

export const handleInvoiceListSaveItem = (item) => {
  return {
    type: invoiceListSaveItem,
    item,
  };
};
export const handleInvoiceListDeleteItem = (invoiceNumber) => {
  return {
    type: invoiceListDeleteItem,
    invoiceNumber,
  };
};

export const handleInvoiceFormRED = (row, isView, isEdit, isCopy) => {
  return {
    type: invoiceFormRED,
    row,
    isView,
    isEdit,
    isCopy,
  };
};
