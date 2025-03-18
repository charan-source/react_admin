import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import Header from "../../components/Header";
import {
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";
// import { useNavigation } from "react-router-dom";

// Ticket data
const tickets = [
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
  // const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width: 1300px)");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, headerClassName: "bold-header" },
    { field: "subject", headerName: "Subject", flex: 1, headerClassName: "bold-header" },
    { field: "priority", headerName: "Priority", flex: 1, headerClassName: "bold-header" },
    { field: "status", headerName: "Status", flex: 1, headerClassName: "bold-header" },
    { field: "date", headerName: "Created", flex: 1, headerClassName: "bold-header" },
    { field: "updated", headerName: "Updated", flex: 1, headerClassName: "bold-header" },
    { field: "type", headerName: "Type", flex: 1, headerClassName: "bold-header" },
    { field: "category", headerName: "Category", flex: 1, headerClassName: "bold-header" },
    { field: "department", headerName: "Department", flex: 1, headerClassName: "bold-header" },
  ];


  // const handleImport = () => {
  //   alert("Import functionality to be implemented");
  // };

  // const handleExport = () => {
  //   alert("Export functionality to be implemented");
  // };

  // Handle new ticket button click
  const handleNewTicket = () => {
    alert("New ticket functionality to be implemented");
  };


  return (
    <Box m="20px">
      {/* <Header title="All Tickets" subtitle="List of All Tickets" /> */}
      {isMobile ? (
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 1 }}>
          <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            <InputBase sx={{ ml: 2, minWidth: "50px", maxWidth: "300px" }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              fontWeight: "bold",
              color: "#ffffff",
              whiteSpace: "nowrap",
              padding: "8px 12px",
              fontSize: "14px",
              textTransform: "none",
            }}
            startIcon={<AddIcon />}
            onClick={handleNewTicket}
          >
            New Experience
          </Button>

        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" backgroundColor="#ffffff" borderRadius="3px">
            <InputBase sx={{ ml: 2, maxWidth: "300px" }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              fontWeight: "bold",
              color: "#ffffff",
              whiteSpace: "nowrap",
              padding: "12px 18px",
              fontSize: "14px",
              textTransform: "none",
            }}
            startIcon={<AddIcon />}
            onClick={handleNewTicket}
          >
            New Experience
          </Button>

        </Box>
      )}

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
      textTransform: "uppercase",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold !important",
      fontSize: "16px !important",
    },
    "& .MuiDataGrid-iconButtonContainer": {
      color: "#ffffff !important", // Ensures filter icons are white
    },
    "& .MuiDataGrid-menuIcon": {
      color: "#ffffff !important", // Makes the filter icon white
    },
    "& .MuiDataGrid-sortIcon": {
      color: "#ffffff !important", // Makes the sorting icon white
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: "#ffffff",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
      color: "#ffffff", // Footer text color white
    },
    "& .MuiTablePagination-root": {
      color: "#ffffff !important", // Pagination text color white
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
      color: "#ffffff !important", // "Rows per page" dropdown text white
    },
    "& .MuiTablePagination-displayedRows": {
      color: "#ffffff !important", // "1-10 of 100" text white
    },
    "& .MuiSvgIcon-root": {
      color: "#ffffff !important", // Pagination icons (next/previous) in white
    },
    "& .MuiDataGrid-toolbarContainer": {
      color: "#ffffff !important", // Toolbar text color
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: "#ffffff !important", // Toolbar buttons text white
    },
  }}
>
  <DataGrid
    rows={tickets}
    columns={columns}
    components={{ Toolbar: GridToolbar }}
  />
</Box>






    </Box>
  );
};

export default AllExperiences;
