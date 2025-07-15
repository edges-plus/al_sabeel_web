import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import Container from "@components/DashboardLayout/container";
import DataTable from "@components/DataTable";
import {
  getJournalEntryById,
  deleteJournalEntry,
} from "@root/redux/actions/journalEntry.actions";

function JournalEntryDetail() {
  const { id } = useParams();
  const { permissions } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const hasPermission = (perm) => permissions?.includes(perm);

  const fetchEntry = useCallback(async () => {
    const data = await dispatch(getJournalEntryById(id));
    setEntry(data);
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchEntry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEntry]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {

      const success = await dispatch(deleteJournalEntry(id));
      if (success) {
        navigate("/JournalEntries");
      }
    }
  };

  if (!entry) return null;

  const flatLines = entry.lines.map((line) => ({
    ...line,
    ledgerName: line.Ledger?.name || "",
  }));
  const columns = [
    { key: "ledgerName", label: "Ledger" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
    { key: "description", label: "Narration" },
  ];

  return (
    <Container header={`Journal Entry: ${entry.referenceNumber}`} divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Date:</strong> {entry.date}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Type:</strong> {entry.type}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {entry.description}
          </Typography>
        </Box>
      {hasPermission("accounts.journalEntryDelete") && (  
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Entry
        </Button>
        )}
      </Box>
      

      <DataTable
        data={flatLines}
        columns={columns}
        emptyMessage="No lines available."
      />
    </Container>
  );
}

export default JournalEntryDetail;
