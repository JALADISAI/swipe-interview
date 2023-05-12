import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/invoiceDetails";
import InvoiceList from "./components/invoiceList";

const store = configureStore({ reducer: rootReducer });

const App = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const toggleInvoiceForm = (value) => {
    setShowInvoiceForm(value);
  };
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          {!showInvoiceForm && (
            <InvoiceList toggleInvoiceForm={toggleInvoiceForm} />
          )}
          {showInvoiceForm && <InvoiceForm />}
        </Container>
      </div>
    </Provider>
  );
};

export default App;
