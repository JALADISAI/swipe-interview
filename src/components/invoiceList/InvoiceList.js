import React from "react";
import Button from "react-bootstrap/Button";

import {
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFormFieldValue,
  handleInvoiceFormToggleFlag,
} from "../../actions/invoiceForm.action";
import {
  handleInvoiceFormRED,
  handleInvoiceListDeleteItem,
} from "../../actions/invoiceList.action";
import InvoiceModal from "../invoiceDetails/InvoiceModal";

const InvoiceList = (props) => {
  const invoiceList = useSelector((state) => state.invoiceList.list || []);
  const storeItems = [...useSelector((state) => state.invoiceForm.items || [])];
  const formValues = useSelector((state) => state.invoiceForm.formValues || {});
  const toggleFlags = useSelector(
    (state) => state.invoiceForm.toggleFlags || {}
  );
  const dispatch = useDispatch();

  const handleClickInvoiceNumber = (row) => {
    dispatch(handleInvoiceFormRED(row, true, false, false));
    props.toggleInvoiceForm(true);
  };
  const handleClickPreviewIcon = (row) => {
    dispatch(handleInvoiceFormRED(row));
    dispatch(handleFormFieldValue({ key: `isOpen`, value: true }));
    dispatch(
      handleInvoiceFormToggleFlag({
        key: `showPreviewInList`,
        value: true,
      })
    );
  };
  const handleClickEditIcon = (row) => {
    dispatch(handleInvoiceFormRED(row, false, true, false));
    props.toggleInvoiceForm(true);
  };
  const handleClickCopyIcon = (row) => {
    dispatch(handleInvoiceFormRED(row, false, false, true));
    props.toggleInvoiceForm(true);
  };
  const handleClickDeleteIcon = (row) => {
    dispatch(handleInvoiceListDeleteItem(row.data.invoiceNumber));
  };
  const closeModal = () => {
    dispatch(
      handleInvoiceFormToggleFlag({
        key: `showPreviewInList`,
        value: false,
      })
    );
  };

  return (
    <div>
      <Button
        onClick={() => props.toggleInvoiceForm(true)}
        variant="primary"
        className="d-block mr-t-10"
      >
        Create New Invoice
      </Button>
      {invoiceList.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Bill To</th>
              <th>Bill From</th>
              <th>Due Date</th>
              <th>Total Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((item, index) => {
              return (
                <tr key={index}>
                  <td
                    className="invoiceNumber"
                    onClick={() => handleClickInvoiceNumber(item)}
                  >
                    {item.data.invoiceNumber}
                  </td>
                  <td>{item.data.billTo}</td>
                  <td>{item.data.billFrom}</td>
                  <td>{item.data.dateOfIssue}</td>
                  <td>
                    <AiOutlineDollarCircle />
                    {parseFloat(item.data.total).toLocaleString(`en-IN`)}
                  </td>
                  <td className="icons">
                    <AiOutlineEye
                      onClick={() => handleClickPreviewIcon(item)}
                    />
                    <AiOutlineEdit onClick={() => handleClickEditIcon(item)} />
                    <AiOutlineCopy onClick={() => handleClickCopyIcon(item)} />
                    <AiOutlineDelete
                      onClick={() => handleClickDeleteIcon(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {invoiceList.length === 0 && (
        <div>
          <p>No Invoices to display</p>
        </div>
      )}
      {toggleFlags.showPreviewInList && (
        <InvoiceModal
          showModal={formValues.isOpen}
          closeModal={closeModal}
          info={formValues}
          items={storeItems}
          currency={formValues.currency}
          subTotal={formValues.subTotal}
          taxAmmount={formValues.taxAmmount}
          discountAmount={formValues.discountAmount}
          total={formValues.total}
        />
      )}
    </div>
  );
};
export default InvoiceList;
