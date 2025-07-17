import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import dayjs from "dayjs";
import {
  getJournalEntries,
  updateJournalEntryParams,
} from "@root/redux/actions/journalEntry.actions";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entries, params } = useSelector((state) => state.journalEntry);

  useEffect(() => {
    dispatch(getJournalEntries(params));
  }, [dispatch, params.page, params.rowsPerPage]);

  const handleRowClick = (row) => {
    navigate(`/JournalEntries/${row.id}`);
  };

  const handleParamsChange = (updatedParams) => {
    dispatch(updateJournalEntryParams(updatedParams));
  };

  const columns = [
    { key: "referenceNumber", label: "Reference #" },
    { key: "date", 
      label: "Date",
      render: (row) => dayjs(row.date).format("DD-MM-YYYY"),
    },
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
  ];

  return (
    <Container header="Journal Entries" divider={true}>
      <DataTable
        data={entries}
        columns={columns}
        emptyMessage="No journal entries found."
        onRowClick={handleRowClick}
        params={params}
        updateParams={handleParamsChange}
      />
    </Container>
  );
}

export default Index;
