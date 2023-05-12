import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const InvoiceList = (props) => {
  const invoiceList = useSelector((state) => state.invoiceList.list || []);
  return (
    <div>
      <Button
        onClick={() => props.toggleInvoiceForm(true)}
        variant="primary"
        className="d-block w-100 mr-t-10"
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
            </tr>
          </thead>
          <tbody></tbody>
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
