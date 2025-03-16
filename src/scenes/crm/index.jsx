import React, { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import CmForm from "../cmform";

const Crm = () => {
  const colors = tokens("light");
   const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets] = useState([
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  

    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  
    {
      id: 616840,
      name: "Satya Narayana",
      email: "Satya@gmail.com",
      phone: "1234567890",
      city: "Visakhapatnam",
      created: "14th March, 2025",
    },  

    // Add more ticket data here...
  ]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle new ticket button click
  // const handleNewTicket = () => {
  //   alert("New ticket functionality to be implemented");
  // };

  return (
    <Box>
{isMobile ? (
  <Box display="flex" justifyContent="space-between"  p={3} gap={2}>
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        background: "#ffffff",
        flexGrow: 1, // Makes input responsive
        minWidth: "100px", // Minimum width for small screens
        maxWidth: "600px", // Maximum width for large screens
        padding: "5px 20px",
        borderRadius: "8px",
        "& fieldset": { border: "none" }, // Removes the border
      }}
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
      }}
    />
          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              fontWeight: "bold",
              color: "#ffffff",
              whiteSpace: "nowrap",
              // paddingX: "15px"
              padding: "12px 24px ",
              fontSize: "14px",
              textTransform:"none"

            }}
            // startIcon={<AddIcon />}
            onClick={()=> navigate('cmform')}
          >
            Create New
          </Button>
  </Box>
) : (
  <Box display="flex" justifyContent="space-between" alignItems="center" p={3} gap={2}>
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        background: "#ffffff",
        flexGrow: 1, // Makes input responsive
        minWidth: "100px", // Minimum width for small screens
        maxWidth: "600px", // Maximum width for large screens
        padding: "5px 20px",
        borderRadius: "8px",
        "& fieldset": { border: "none" }, // Removes the border
      }}
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
      }}
    />
          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              fontWeight: "bold",
              color: "#ffffff",
              whiteSpace: "nowrap",
              // paddingX: "15px"
              padding: "12px 24px ",
              fontSize: "14px",
              textTransform:"none"

            }}
            // startIcon={<AddIcon />}
            onClick={()=> navigate('cmform')}
          >
            Create New
          </Button>
  </Box>
)}

     <Box sx={{padding: isMobile ? 0 : 2}}>

      {/* Responsive Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto",
         "&::-webkit-scrollbar": {
          height: "4px", // Adjust scrollbar height
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Scrollbar color
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="responsive table">
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.blueAccent[500] }}>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.id}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.name}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.email}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.phone}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.city}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{ticket.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
};

export default Crm;