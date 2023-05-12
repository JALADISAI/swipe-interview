import { combineReducers } from "@reduxjs/toolkit";
import invoiceListReducer from "./invoiceList.reducer";
import invoiceFormReducer from "./invoiceForm.reducer";

const reducers = combineReducers({
  invoiceList: invoiceListReducer,
  invoiceForm: invoiceFormReducer,
});

export default reducers;
