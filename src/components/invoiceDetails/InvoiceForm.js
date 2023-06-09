import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import {
  handleFormFieldValue,
  handleFormItems,
  handleFormBulkUpdate,
  handleInvoiceFormReset,
} from "../../actions/invoiceForm.action";
import { useDispatch, useSelector } from "react-redux";
import {
  handleInvoiceFormUpdate,
  handleInvoiceListSaveItem,
} from "../../actions/invoiceList.action";

const InvoiceForm = (props) => {
  const dispatch = useDispatch();
  const storeItems = [...useSelector((state) => state.invoiceForm.items || [])];
  const formValues = useSelector((state) => state.invoiceForm.formValues || {});
  const toggleFlags = useSelector(
    (state) => state.invoiceForm.toggleFlags || {}
  );

  const handleCalculateTotal = (list, data) => {
    var subTotal = 0;
    (list || storeItems).forEach(function (item) {
      subTotal = parseFloat(
        subTotal + parseFloat(item.price).toFixed(2) * parseInt(item.quantity)
      ).toFixed(2);
      subTotal = parseFloat(subTotal);
    });
    const taxAmmount = parseFloat(
      parseFloat(subTotal) * ((data?.taxRate || formValues.taxRate) / 100)
    ).toFixed(2);
    const discountAmount = parseFloat(
      parseFloat(subTotal) *
        ((data?.discountRate || formValues.discountRate) / 100)
    ).toFixed(2);

    const temp = {
      subTotal: parseFloat(subTotal).toFixed(2),
      taxAmmount,
      discountAmount,
      total: parseFloat(
        subTotal - parseFloat(discountAmount) + parseFloat(taxAmmount)
      ).toFixed(2),
    };

    dispatch(handleFormBulkUpdate(temp));
  };

  const handleRowDel = (items) => {
    var index = storeItems.indexOf(items);
    storeItems.splice(index, 1);
    dispatch(handleFormItems(storeItems));
    handleCalculateTotal();
  };
  const handleAddEvent = (evt) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    storeItems.push(items);
    dispatch(handleFormItems(storeItems));
    handleCalculateTotal();
  };

  const onItemizedItemEdit = (data) => {
    var item = {
      id: data.id,
      name: data.name,
      value: data.value,
    };
    var newItems = storeItems.map(function (storeItem) {
      const temp = { ...storeItem };
      for (var key in temp) {
        if (key === item.name && temp.id === item.id) {
          temp[key] = item.value;
        }
      }
      return temp;
    });
    dispatch(handleFormItems(newItems));
    handleCalculateTotal(newItems);
  };
  const editField = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const obj = { key, value };
    dispatch(handleFormFieldValue(obj));
    if (key === `taxRate` || key === `discountRate`) {
      handleCalculateTotal(false, { [key]: value });
    }
  };
  const onCurrencyChange = (selectedOption) => {
    dispatch(
      handleFormFieldValue({
        key: `selectedOption`,
        value: selectedOption,
      })
    );
  };
  const openModal = () => {
    dispatch(handleFormFieldValue({ key: `isOpen`, value: true }));
  };
  const closeModal = (event) =>
    dispatch(handleFormFieldValue({ key: `isOpen`, value: false }));
  const handleCreateInvoice = (isEdit) => {
    !isEdit &&
      dispatch(
        handleInvoiceListSaveItem({
          data: formValues,
          items: storeItems,
        })
      );
    isEdit &&
      dispatch(
        handleInvoiceFormUpdate({
          data: formValues,
          items: storeItems,
        })
      );
    dispatch(handleInvoiceFormReset());
    props.toggleInvoiceForm(false);
  };
  const handleBack = () => {
    props.toggleInvoiceForm(false);
    dispatch(handleInvoiceFormReset());
  };
  return (
    <Form onSubmit={() => handleCreateInvoice(toggleFlags.isEdit)}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={formValues.dateOfIssue}
                    name={"dateOfIssue"}
                    onChange={(event) => editField(event)}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={!toggleFlags.isCopy ? formValues.invoiceNumber : ""}
                  name={"invoiceNumber"}
                  disabled={toggleFlags.isEdit}
                  onChange={(event) => editField(event)}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={formValues.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={formValues.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={formValues.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={formValues.billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={formValues.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={formValues.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={formValues.currency}
              items={storeItems}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {formValues.currency}
                    {formValues.subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">
                      ({formValues.discountRate || 0}%)
                    </span>
                    {formValues.currency}
                    {formValues.discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({formValues.taxRate || 0}%)</span>
                    {formValues.currency}
                    {formValues.taxAmmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {formValues.currency}
                    {formValues.total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={formValues.notes}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              onClick={openModal}
              variant="outline-primary"
              className="d-block w-100"
            >
              Review Invoice
            </Button>
            {!toggleFlags.isView && (
              <Button
                type="submit"
                // onClick={() => handleCreateInvoice(toggleFlags.isEdit)}
                variant="primary"
                className="d-block w-100 mr-t-10"
              >
                {toggleFlags.isEdit ? `Update Invoice` : `Create Invoice`}
              </Button>
            )}
            {(toggleFlags.isView ||
              toggleFlags.isEdit ||
              toggleFlags.isCopy) && (
              <Button
                onClick={handleBack}
                variant="outline-secondary"
                className="d-block w-100 mr-t-10"
              >
                Back
              </Button>
            )}
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
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onCurrencyChange({ currency: event.target.value })
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={formValues.taxRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={formValues.discountRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
