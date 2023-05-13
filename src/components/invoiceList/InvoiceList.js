import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCopy,
} from "react-icons/ai";

const InvoiceList = (props) => {
  const invoiceList = useSelector((state) => state.invoiceList.list || []);
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
                  <td>{item.data.invoiceNumber}</td>
                  <td>{item.data.billTo}</td>
                  <td>{item.data.billFrom}</td>
                  <td>{item.data.dateOfIssue}</td>
                  <td>{item.data.total}</td>
                  <td className="icons">
                    <AiOutlineEye />
                    <AiOutlineEdit />
                    <AiOutlineCopy />
                    <AiOutlineDelete />
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
