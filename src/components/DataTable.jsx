import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, useMediaQuery, useTheme,
  Box, Card, CardContent, Grid, Tooltip
} from "@mui/material";
import { motion } from "framer-motion";

function DataTable({
  columns,
  data,
  emptyMessage = "No data found.",
  titleField,
  onRowClick,
  params = { count: 0, rowsPerPage: 10, page: 1 },
  updateParams,
  spanningRows = []
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedRows, setExpandedRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    updateParams?.({ ...params, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    updateParams?.({
      ...params,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 1,
    });
  };

  const handleRowClick = (item) => {
    onRowClick?.(item);
  };

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  const renderMobileView = () => (
    <Box>
      {data?.length ? (
        data.map((item, index) => (
          <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" custom={index}>
            <Card
              elevation={1}
              sx={{
                mb: 3,
                borderRadius: 2,
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': onRowClick ? { boxShadow: 3 } : {}
              }}
              onClick={() => handleRowClick(item)}
            >
              <CardContent>
                <Grid container spacing={2}>
                  {columns.map((col, colIdx) => (
                    <Grid  key={colIdx}>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
                        {col.label}
                      </Typography>
                      <Typography variant="body2">
                        {typeof col.render === 'function' ? col.render(item) : item[col.key] || '—'}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <Box textAlign="center" py={6} px={2}>
          <Typography variant="body1" color="text.secondary" fontStyle="italic">
            {emptyMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderTableRow = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = true;

    return (
      <React.Fragment key={item.id}>
        <TableRow
          hover
          sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
          onClick={() => handleRowClick?.(item)}
        >
          {columns.map((col, colIdx) => {
            const value =
              typeof col.render === "function"
                ? col.render(item)
                : item[col.key] ?? "—";

            const isFirst = colIdx === 0;

            return (
              <TableCell key={colIdx} align={col.align || "left"}>
                <Box sx={{  pl: isFirst ? level * 2 : 0, display: "flex", alignItems: "center" }}>

                  {isFirst && !item.is_group && (
                    <span style={{ marginRight: 6 }}>📄</span>
                  )}
                  <Box sx={{ fontWeight: item.is_group ? 600 : 400 }}>
                    {value}
                  </Box>
                </Box>
              </TableCell>
            );
          })}
        </TableRow>

        {hasChildren && isExpanded &&
          item.children.map((child) => renderTableRow(child, level + 1))}
      </React.Fragment>
    );
  };

  const renderTableView = () => (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={idx} align={col.align || "left"} sx={{ fontWeight: 'bold' }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length ? (
            <>
              {data.map((item) => renderTableRow(item))}

              {/* Optional spanning rows (totals, summaries, etc.) */}
              {spanningRows.map((row, i) => (
                <TableRow key={`spanning-${i}`}>{row}</TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body1">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, backgroundColor: 'white' }}>
      <Box>{isMobile ? renderMobileView() : renderTableView()}</Box>

      {!isMobile && data?.length > 0 && updateParams && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={params.count ?? 0}
          rowsPerPage={params.rowsPerPage ?? 10}
          page={(params.page ?? 1) - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default DataTable;

