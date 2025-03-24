import { Box, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const TicketDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Changed to min-width for better mobile detection
  const location = useLocation();

  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);
  console.log("Ticket:", ticket);

  const getExperienceColor = (experience) => {
    switch (experience) {
      case "Frustrated":
        return "#E64A19";
      case "Extremely Frustrated":
        return "#D32F2F";
      case "Happy":
        return "#FBC02D";
      case "Extremely Happy":
        return "#388E3C";
      default:
        return "#616161";
    }
  };

  const handleFormSubmit = (values) => {
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
  };

  const initialValues = {
    organization: ticket.organization || "",
    cmname: ticket.cmname || "",
    experience: ticket.experience || "",
    priority: ticket.priority || "",
    crmname: ticket.crmname || "",
    status: ticket.status || "",
    department: ticket.department || "",
    date: ticket.date || "",
    time: ticket.time || "",
    subject: ticket.subject || "",
    requestdetails: ticket.requestdetails || "",
    phoneCode: ticket.phoneCode || "",
    PhoneNo: ticket.PhoneNo || "",
    notes: ticket.notes || "",
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    cmname: yup.string().required("Required"),
    crmname: yup.string().required("Required"),
    status: yup.string().required("Required"),
    department: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    subject: yup.string().required("Required"),
    phoneCode: yup.string().required("Required"),
    PhoneNo: yup
      .string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    notes: yup.string(),
  });

  return (
    <Box 
      m={isNonMobile ? "15px" : "10px"} // Adjusted margins for mobile
      height="auto" // Changed to auto for better mobile responsiveness
      sx={{ 
        backgroundColor: "#ffffff", 
        padding: isNonMobile ? "20px" : "15px", // Adjusted padding for mobile
        borderRadius: "8px",
        minHeight: isNonMobile ? "70vh" : "auto", // Only set fixed height on desktop
        overflow: "auto" // Ensure content doesn't overflow
      }}
    >
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values }) => (
          <form>
            <Box
              display="grid"
              gap="20px" // Reduced gap for mobile
              sx={{ 
                paddingLeft: isNonMobile ? "20px" : "10px", // Adjusted padding for mobile
                paddingRight: isNonMobile ? "0" : "10px" // Added right padding for mobile
              }}
              gridTemplateColumns={isNonMobile ? "repeat(3, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
            >
              {/* Organization */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Organization</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.organization}</Box>
              </Box>

              {/* Customer Manager Name */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Customer Manager Name</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.cmname}</Box>
              </Box>

              {/* Experience */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Experience</Box>
                <Box sx={{ fontSize: "16px", color: getExperienceColor(values.experience) }}>{values.experience}</Box>
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Priority</Box>
                <Box sx={{ fontSize: "16px", color: getExperienceColor(values.priority) }}>{values.priority}</Box>
              </Box>
              
              {/* Status */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Status</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.status}</Box>
              </Box>

              {/* Department */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Impact</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.department}</Box>
              </Box>

              {/* Date */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Date</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.date}</Box>
              </Box>

              {/* Time */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Time</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.time}</Box>
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Customer Relationship Manager</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.crmname}</Box>
              </Box>
            </Box>

            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              paddingLeft: isNonMobile ? "20px" : "10px",
              paddingRight: isNonMobile ? "0" : "10px",
              gap: "20px", 
              marginTop: "20px"
            }}>
              <Box>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Subject</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.subject}</Box>
              </Box>

              <Box>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Request Details</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.requestdetails}</Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TicketDetails;