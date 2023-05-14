import {
  invoiceListDeleteItem,
  invoiceListSaveItem,
  invoiceListUpdateItem,
} from "../types";

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
    case invoiceListUpdateItem: {
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.data.invoiceNumber === action.item.data.invoiceNumber) {
            return action.item;
          }
          return item;
        }),
      };
    }
    case invoiceListDeleteItem: {
      return {
        ...state,
        list: state.list.filter(
          (item) => item.data.invoiceNumber !== action.invoiceNumber
        ),
      };
    }
    default:
      return state;
  }
}
