import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import { getInvoices, updateInvoiceParams } from "@root/redux/actions/invoiceAction";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoices, params } = useSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(getInvoices(params));
  }, [dispatch, params.page, params.rowsPerPage]);

  const addInvoice = () => navigate("/invoice/add");

  const columns = [
    { key: "invoice_number", label: "Invoice Number" },
    { key: "invoice_date", label: "Invoice Date" },
    { key: "amount", label: "Amount" },
    { key: "narration", label: "Narration" },
  ];

  const updateParams = (newParams) => {
    dispatch(updateInvoiceParams(newParams));
  };

  return (
    <Container
      header="Invoices"
      buttonFunction={addInvoice}
      buttonText="Add Invoice"
      addButton={false}
      divider={true}    >
      <DataTable
        columns={columns}
        data={invoices}
        emptyMessage="No invoices found."
        titleField="invoiceNumber"
        params={params}
        updateParams={updateParams}
      />
    </Container>
  );
}

export default Index;
