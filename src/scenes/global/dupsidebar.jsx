import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
  MenuItem,
  Menu,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  Search as SearchIcon,
  ImportExport as ImportExportIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Initial ticket data
const initialTickets = [
  {
    id: 223958,
    subject: "Eligendi ut illum alias voluptatibus eos molestiae accusantium.",
    priority: "Very Urgent",
    status: "Processing",
    date: "2 hours ago",
    updated: "2 hours ago",
    type: "Bug",
    category: "Software",
    department: "IT",
  },
  {
    id: 616840,
    subject: "Vero excepturi cunque nulla est corrupti.",
    priority: "Less Urgent",
    status: "Pending",
    date: "2 hours ago",
    updated: "2 hours ago",
    type: "Feature Request",
    category: "Hardware",
    department: "Support",
  },
  // Add more tickets...
];

const AllExperiences = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width: 1300px)");

  // State for tickets
  const [tickets, setTickets] = useState(initialTickets);
  const [filteredTickets, setFilteredTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");

  // State for filter menu
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priority: [],
    status: [],
    type: [],
    category: [],
    department: [],
  });

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 0.8, headerClassName: "bold-header", disableColumnMenu: false },
    { field: "subject", headerName: "Subject", flex: 1, headerClassName: "bold-header", disableColumnMenu: true },
    { field: "priority", headerName: "Priority", flex: 1, headerClassName: "bold-header", disableColumnMenu: true },
    { field: "status", headerName: "Status", flex: 1, headerClassName: "bold-header", disableColumnMenu: true },
    { field: "date", headerName: "Created", flex: 1, headerClassName: "bold-header", disableColumnMenu: true },
    { field: "updated", headerName: "Updated", flex: 1, headerClassName: "bold-header", disableColumnMenu: true },
  ];

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    applyFilters(event.target.value, selectedFilters);
  };

  // Handle filter button click
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle filter selection
  const handleFilterSelect = (filterType, value) => {
    const updatedFilters = { ...selectedFilters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
    } else {
      updatedFilters[filterType].push(value);
    }
    setSelectedFilters(updatedFilters);
    applyFilters(searchTerm, updatedFilters);
  };

  // Apply filters based on search term and selected filters
  const applyFilters = (searchTerm, filters) => {
    let filtered = tickets;

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((ticket) =>
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.priority.length > 0) {
      filtered = filtered.filter((ticket) => filters.priority.includes(ticket.priority));
    }
    if (filters.status.length > 0) {
      filtered = filtered.filter((ticket) => filters.status.includes(ticket.status));
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter((ticket) => filters.type.includes(ticket.type));
    }
    if (filters.category.length > 0) {
      filtered = filtered.filter((ticket) => filters.category.includes(ticket.category));
    }
    if (filters.department.length > 0) {
      filtered = filtered.filter((ticket) => filters.department.includes(ticket.department));
    }

    setFilteredTickets(filtered);
  };

  // Get unique values for filters
  const getUniqueValues = (key) => {
    return [...new Set(tickets.map((ticket) => ticket[key]))];
  };

  return (
    <Box m="20px">
      {/* Custom Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Search Bar */}
        <Box display="flex" backgroundColor="#ffffff" borderRadius="3px" flex={1}>
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={() => applyFilters(searchTerm, selectedFilters)}>
            <SearchIcon />
          </IconButton>
        </Box>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    id="import-button"
                    style={{ display: "none" }}
                    onChange={handleImport}
                  />
                  <label htmlFor="import-button">
                    <Button
                      variant="contained"
                      startIcon={<ImportExportIcon />}
                      component="span"
                      sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: "#ffffff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Import
                    </Button>
                  </label>
        
                  {/* Export Button */}
                  <Button
                    variant="contained"
                    startIcon={<ImportExportIcon />}
                    onClick={handleExport}
                    sx={{
                      backgroundColor: colors.blueAccent[500],
                      color: "#ffffff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Export
                  </Button>

        {/* Filter Button with Dropdown */}
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
          onClick={handleFilterClick}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "#ffffff",
            whiteSpace: "nowrap",
          }}
        >
          Filter
        </Button>
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          {/* Priority Filter */}
          <Typography variant="h6" sx={{ p: 2 }}>Priority</Typography>
          {getUniqueValues("priority").map((priority) => (
            <MenuItem key={priority}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.priority.includes(priority)}
                    onChange={() => handleFilterSelect("priority", priority)}
                  />
                }
                label={priority}
              />
            </MenuItem>
          ))}

          {/* Status Filter */}
          <Typography variant="h6" sx={{ p: 2 }}>Status</Typography>
          {getUniqueValues("status").map((status) => (
            <MenuItem key={status}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.status.includes(status)}
                    onChange={() => handleFilterSelect("status", status)}
                  />
                }
                label={status}
              />
            </MenuItem>
          ))}

          {/* Type Filter */}
          <Typography variant="h6" sx={{ p: 2 }}>Type</Typography>
          {getUniqueValues("type").map((type) => (
            <MenuItem key={type}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.type.includes(type)}
                    onChange={() => handleFilterSelect("type", type)}
                  />
                }
                label={type}
              />
            </MenuItem>
          ))}

          {/* Category Filter */}
          <Typography variant="h6" sx={{ p: 2 }}>Category</Typography>
          {getUniqueValues("category").map((category) => (
            <MenuItem key={category}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.category.includes(category)}
                    onChange={() => handleFilterSelect("category", category)}
                  />
                }
                label={category}
              />
            </MenuItem>
          ))}

          {/* Department Filter */}
          <Typography variant="h6" sx={{ p: 2 }}>Department</Typography>
          {getUniqueValues("department").map((department) => (
            <MenuItem key={department}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.department.includes(department)}
                    onChange={() => handleFilterSelect("department", department)}
                  />
                }
                label={department}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* DataGrid Table */}
      <Box
        m="13px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "16px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontWeight: "bold !important",
            fontSize: "16px !important",
            color: "#ffffff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            color: "#ffffff",
          },
        }}
      >
        <DataGrid
          rows={filteredTickets}
          columns={columns}
          disableColumnMenu
        />
      </Box>
    </Box>
  );
};

export default AllExperiences;