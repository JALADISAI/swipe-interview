import { invoiceListSaveItem } from "../types";

const initialState = {
  list: [],
};
export default function invoiceListReducer(state = initialState, action) {
  switch (action.type) {
    case invoiceListSaveItem: {
      return {
        ...state,
        list: [...state.list, action.item],
      };
    }
    default:
      return state;
  }
}
