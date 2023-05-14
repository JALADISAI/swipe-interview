import { invoiceListDeleteItem, invoiceListSaveItem } from "../types";

const initialState = {
  list: [
    {
      data: {
        isOpen: false,
        currency: "$",
        currentDate: "",
        invoiceNumber: 1,
        dateOfIssue: "2023-05-25",
        billTo: "efsd",
        billToEmail: "sdg@dfg.com",
        billToAddress: "sdfgf",
        billFrom: "dfg",
        billFromEmail: "dfdf@sdf.com",
        billFromAddress: "sdf",
        notes: "Thanks for tying notes",
        total: "14648.19",
        subTotal: "12963.00",
        taxRate: "18",
        taxAmmount: "2333.34",
        discountRate: "5",
        discountAmount: "648.15",
      },
      items: [
        {
          id: "1",
          name: "sfg",
          description: "sdfgs",
          price: "4321.00",
          quantity: "3",
        },
      ],
    },
  ],
};
export default function invoiceListReducer(state = initialState, action) {
  switch (action.type) {
    case invoiceListSaveItem: {
      return {
        ...state,
        list: [...state.list, action.item],
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
