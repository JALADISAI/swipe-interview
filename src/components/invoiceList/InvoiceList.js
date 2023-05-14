import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCopy,
} from "react-icons/ai";
import {
  handleInvoiceFormRED,
  handleInvoiceListDeleteItem,
} from "../../actions/invoiceList.action";
import { handleFormFieldValue } from "../../actions/invoiceForm.action";

const InvoiceList = (props) => {
  const invoiceList = useSelector((state) => state.invoiceList.list || []);
  const dispatch = useDispatch();

  const handleClickInvoiceNumber = (row) => {
    dispatch(handleInvoiceFormRED(row, true, false, false));
    props.toggleInvoiceForm(true);
  };
  const handleClickPreviewIcon = (row) => {
    dispatch(handleInvoiceFormRED(row));
    dispatch(handleFormFieldValue({ key: `isOpen`, value: true }));
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
                  <td>{item.data.total}</td>
                  <td className="icons">
                    <AiOutlineEye
                      onClick={() => handleClickInvoiceNumber(item)}
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
    </div>
  );
};
export default InvoiceList;
