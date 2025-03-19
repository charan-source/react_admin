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
  }, {
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

const PendingExperiences = () => {
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
    { field: "id", headerName: "ID", flex: 0.4, headerClassName: "bold-header", disableColumnMenu: false },
    { field: "subject", headerName: "Subject", flex: 2, headerClassName: "bold-header", disableColumnMenu: true },
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


  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setTickets(json); // Update state with imported data
        setFilteredTickets(json); // Also update filtered data
        alert("Data imported successfully!");
      };
      reader.readAsBinaryString(file);
    }
  };

  // Handle export action
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTickets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "tickets.xlsx");
    alert("Data exported successfully!");
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
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important", // Ensure header text is bold
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ffffff",
            // scrollbarWidth: "thin", 
            // Custom scrollbar styles
            "&::-webkit-scrollbar": {
              width: "1px", // Width of the scrollbar
              height: "5px", // Height of the horizontal scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colors.grey[200], // Color of the scrollbar track
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.blueAccent[500], // Color of the scrollbar thumb
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: colors.blueAccent[700], // Color of the scrollbar thumb on hover
              },
            },
          },
          "& .MuiDataGrid-row": {
            borderBottom: `0.5px solid ${colors.grey[300]}`, // Add border to the bottom of each row
          },
          "& .MuiTablePagination-root": {
            color: "#ffffff !important", // Ensure pagination text is white
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
            color: "#ffffff !important", // Ensure select label and input text are white
          },
          "& .MuiTablePagination-displayedRows": {
            color: "#ffffff !important", // Ensure displayed rows text is white
          },
          "& .MuiSvgIcon-root": {
            color: "#ffffff !important", // Ensure pagination icons are white
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

export default PendingExperiences;