import React, { useState } from "react";
import {
  Box,
  // Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  // useTheme
} from "@mui/material";
// import {  Add } from "@mui/icons-material";
// import { tokens } from "../../theme";

// Sample Ticket Data
const sampleTickets = [
  { key: "#525464", subject: "Quo cupiditate quis dolores.", priority: "Less Urgent", status: "Pending", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#466763", subject: "Et consequatur voluptatem et dolor modi.", priority: "Less Urgent", status: "Waiting for confirmation", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#470049", subject: "Dolores est molestias beatae temporibus aspernatur delectus adipisci.", priority: "Generally", status: "Processing", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#606794", subject: "Fuga commodi aut rerum sed modi.", priority: "Very Urgent", status: "Resolved", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#525464", subject: "Quo cupiditate quis dolores.", priority: "Less Urgent", status: "Pending", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#466763", subject: "Et consequatur voluptatem et dolor modi.", priority: "Less Urgent", status: "Waiting for confirmation", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#470049", subject: "Dolores est molestias beatae temporibus aspernatur delectus adipisci.", priority: "Generally", status: "Processing", date: "3 hours ago", updated: "3 hours ago" },
  { key: "#606794", subject: "Fuga commodi aut rerum sed modi.", priority: "Very Urgent", status: "Resolved", date: "3 hours ago", updated: "3 hours ago" }
];

// Function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "red";
    case "Processing":
      return "orange";
    case "Resolved":
      return "green";
    default:
      return "gray";
  }
};

const ResolvedExperiences = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(sampleTickets);
  
  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterTickets(e.target.value, priorityFilter, statusFilter);
  };

  // Handle Filters
  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
    filterTickets(search, e.target.value, statusFilter);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    filterTickets(search, priorityFilter, e.target.value);
  };

  // Filter Function
  const filterTickets = (searchText, priority, status) => {
    let updatedTickets = sampleTickets;

    if (searchText) {
      updatedTickets = updatedTickets.filter((ticket) =>
        ticket.subject.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (priority) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.priority === priority
      );
    }
    if (status) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.status === status
      );
    }

    setFilteredTickets(updatedTickets);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <TextField
          label="Search..."
          variant="outlined"
          size="medium"
          value={search}
          onChange={handleSearch}
          sx={{ fontSize: "1rem" }}
        />
        {/* <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "1rem",
            fontWeight: "bold",
            padding: "7px 15px",
            marginTop: "10px",
          }}
        >
          New Ticket
        </Button> */}
      </Box>

      {/* Filters */}
      <Box my={2} display="flex" gap={2} flexWrap="wrap">
        <Select
          value={priorityFilter}
          onChange={handlePriorityFilter}
          displayEmpty
          variant="outlined"
          size="medium"
          sx={{ fontSize: "1rem" }}
        >
          <MenuItem value="">Priority</MenuItem>
          <MenuItem value="Less Urgent">Less Urgent</MenuItem>
          <MenuItem value="Generally">Generally</MenuItem>
          <MenuItem value="Very Urgent">Very Urgent</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          displayEmpty
          variant="outlined"
          size="medium"
          sx={{ fontSize: "1rem" }}
        >
          <MenuItem value="">Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Waiting for confirmation">Waiting for confirmation</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Key</TableCell>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Subject</TableCell>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Priority</TableCell>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "1rem" }}>{ticket.key}</TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>{ticket.subject}</TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>{ticket.priority}</TableCell>
                <TableCell sx={{ fontSize: "1rem", color: getStatusColor(ticket.status) }}>{ticket.status}</TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>{ticket.date}</TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>{ticket.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResolvedExperiences;
