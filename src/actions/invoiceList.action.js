import { invoiceListSaveItem } from "../types";

export const handleInvoiceListSaveItem = (item) => {
  return {
    type: invoiceListSaveItem,
    item,
  };
};
