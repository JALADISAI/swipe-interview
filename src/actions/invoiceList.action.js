import {
  invoiceFormRED,
  invoiceListDeleteItem,
  invoiceListSaveItem,
  invoiceListUpdateItem,
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

export const handleInvoiceFormUpdate = (item) => {
  return {
    type: invoiceListUpdateItem,
    item,
  };
};
