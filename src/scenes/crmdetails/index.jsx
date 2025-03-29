import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';
import { useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CrmDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orgManagerPairs, setOrgManagerPairs] = useState([{ org: "", manager: "" }]);
  const location = useLocation();

  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

  useEffect(() => {
    if (ticket.country) {
      const country = Country.getAllCountries().find((c) => c.name === ticket.country);
      setSelectedCountry(country || null);
    }
    if (ticket.state && selectedCountry) {
      const state = State.getStatesOfCountry(selectedCountry.isoCode).find((s) => s.name === ticket.state);
      setSelectedState(state || null);
    }
    if (ticket.city && selectedState) {
      const city = City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode).find((c) => c.name === ticket.city);
      setSelectedCity(city || null);
    }
  }, [ticket, selectedCountry, selectedState]);

  const handleFormSubmit = (values) => {
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const initialValues = {
    firstName: ticket.name?.split(' ')[0] || "",
    middleName: ticket.name?.split(' ')[1] || "",
    lastName: ticket.name?.split(' ')[2] || "",
    street: "",
    city: ticket.city || "",
    state: ticket.state || "",
    country: ticket.country || "",
    email: ticket.email || "",
    PhoneNo: ticket.phoneno || "",
    phoneCode: ticket.phonenocode || "",
    organization0: ticket.organization || "",
    customerManager0: ticket.customermanager || "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required(""),
    street: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    PhoneNo: yup
      .string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    phoneCode: yup.string().required("Required"),
    organization0: yup.string().required("Required"),
    customerManager0: yup.string().required("Required"),
  });
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      "&:hover": {
        borderColor: "#999",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
      },
      padding: "8px 12px",
      height: "50px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccc",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "16px",
      color: "#555",
    },
  };

  // const disabledFieldStyles = {
  //   padding: "12px",
  //   backgroundColor: "#f5f5f5",
  //   borderRadius: "8px",
  //   minHeight: "50px",
  //   display: "flex",
  //   alignItems: "center",
  //   fontSize: "16px",
  //   color: "#000",
  //   // boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  // };


  // const selectStyles = {
  //   "& .MuiOutlinedInput-root": {
  //     borderRadius: "8px",
  //     backgroundColor: "#ffffff",
  //     boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  //     "& .MuiOutlinedInput-notchedOutline": {
  //       borderColor: "#ccc",
  //     },
  //   },
  //   "& .MuiSelect-select": {
  //     padding: "8px 12px",
  //     height: "33px !important",
  //     display: "flex",
  //     alignItems: "center",
  //   },
  // };



  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];

  // const customerManagers = [
  //   "Rambabu",
  //   "Charan",
  //   "Customer Manager 3",
  //   "Customer Manager 4",
  //   "Customer Manager 5",
  // ];

  // const organization = [
  //   "Wipro",
  //   "Infosys",
  //   "TCS",
  //   "HCL",
  //   "Tech Mahindra",
  // ];

  const getPhoneCodeDisplay = (phoneCode) => {
    if (!phoneCode) return "-";
    const country = countries.find(c => `+${c.phonecode}` === phoneCode);
    return country ? `+${country.phonecode} (${country.name})` : phoneCode;
  };

  const renderField = (heading, name, value, fieldComponent, gridSpan = 1) => (
    <Box sx={{ gridColumn: `span ${gridSpan}` }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "#555" }}>
        {heading}
      </Typography>
      {isEditing ? (
        fieldComponent
      ) : (
        <Typography variant="body1" sx={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center"
        }}>
          {value || "-"}
        </Typography>
      )}
    </Box>
  );

  const addOrgManagerPair = () => {
    setOrgManagerPairs([...orgManagerPairs, { org: "", manager: "" }]);
  };


  const removeOrgManagerPair = (index) => {
    if (orgManagerPairs.length > 1) {
      const updatedPairs = [...orgManagerPairs];
      updatedPairs.splice(index, 1);
      setOrgManagerPairs(updatedPairs);
    }
  };

  const customerManagers = [
    "Rambabu",
    "Charan",
    "Sathira",
    "Jyothika",
    "Customer Manager 5",
  ];

  const organization = [
    "Wipro",
    "Infosys",
    "TCS",
    "HCL",
    "Tech Mahindra",
  ];


  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
            >
              {/* First Name */}
              {renderField(
                "First Name",
                "firstName",
                values.firstName,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={textFieldStyles}
                />
              )}

              {/* Middle Name */}
              {renderField(
                "Middle Name",
                "middleName",
                values.middleName,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="middleName"
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.middleName && !!errors.middleName}
                  helperText={touched.middleName && errors.middleName}
                  sx={textFieldStyles}
                />
              )}

              {/* Last Name */}
              {renderField(
                "Last Name",
                "lastName",
                values.lastName,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={textFieldStyles}
                />
              )}

              {/* Email Id */}
              {renderField(
                "Email Id",
                "email",
                values.email,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={textFieldStyles}
                />
              )}

              {/* Phone Number */}
              {renderField(
                "Phone Number",
                "PhoneNo",
                values.PhoneNo ? `${getPhoneCodeDisplay(values.phoneCode)} ${values.PhoneNo}` : "-",
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Autocomplete
                    fullWidth
                    options={countries}
                    getOptionLabel={(option) => `+${option.phonecode} (${option.name})`}
                    value={countries.find((country) => `+${country.phonecode}` === values.phoneCode) || null}
                    onChange={(event, newValue) => {
                      setFieldValue("phoneCode", newValue ? `+${newValue.phonecode}` : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={textFieldStyles}
                        error={!!touched.phoneCode && !!errors.phoneCode}
                        helperText={touched.phoneCode && errors.phoneCode}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="PhoneNo"
                    value={values.PhoneNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.PhoneNo && !!errors.PhoneNo}
                    helperText={touched.PhoneNo && errors.PhoneNo}
                    sx={textFieldStyles}
                  />
                </Box>,
                1
              )}

              {/* Country */}
              {renderField(
                "Country",
                "country",
                values.country,
                <Autocomplete
                  fullWidth
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={selectedCountry}
                  onChange={(event, newValue) => {
                    setSelectedCountry(newValue);
                    setSelectedState(null);
                    setSelectedCity(null);
                    setFieldValue("country", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  )}
                />
              )}

              {/* State */}
              {renderField(
                "State",
                "state",
                values.state,
                <Autocomplete
                  fullWidth
                  options={states}
                  getOptionLabel={(option) => option.name}
                  value={selectedState}
                  onChange={(event, newValue) => {
                    setSelectedState(newValue);
                    setSelectedCity(null);
                    setFieldValue("state", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.state && !!errors.state}
                      helperText={touched.state && errors.state}
                      disabled={!selectedCountry}
                    />
                  )}
                  disabled={!selectedCountry}
                />
              )}

              {/* City */}
              {renderField(
                "City",
                "city",
                values.city,
                <Autocomplete
                  fullWidth
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  value={selectedCity}
                  onChange={(event, newValue) => {
                    setSelectedCity(newValue);
                    setFieldValue("city", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      disabled={!selectedState}
                    />
                  )}
                  disabled={!selectedState}
                />
              )}

              {/* Street Address */}
              {renderField(
                "Street Address",
                "street",
                values.street,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.street && !!errors.street}
                  helperText={touched.street && errors.street}
                  sx={textFieldStyles}
                />
              )}
              {/* 
              {renderField(
                "Organization",
                "organization",
                values.organization,
                <Autocomplete
                  fullWidth
                  options={organization}
                  getOptionLabel={(option) => option}
                  value={values.organization || null}
                  onChange={(event, newValue) => {
                    setFieldValue("organization", newValue || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.organization && !!errors.organization}
                      helperText={touched.organization && errors.organization}
                    />
                  )}
                  popupIcon={<ArrowDropDownIcon />}
                  freeSolo
                />
              )} */}


              {orgManagerPairs.map((pair, index) => (
                <React.Fragment key={`pair-${index}`}>
                  {/* Organization Field */}
                  {renderField(
                    index === 0 ? "Organization" : `Organization ${index + 1}`,
                    `organization${index}`,
                    values[`organization${index}`],
                    <Autocomplete
                      fullWidth
                      options={organization}
                      value={values[`organization${index}`] || null}
                      onChange={(event, newValue) => {
                        setFieldValue(`organization${index}`, newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={textFieldStyles}
                          error={!!touched[`organization${index}`] && !!errors[`organization${index}`]}
                          helperText={touched[`organization${index}`] && errors[`organization${index}`]}
                        />
                      )}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />,
                    1,
                    true // isDropdown flag
                  )}

                  {/* Customer Manager Field */}
                  {renderField(
                    index === 0 ? "Customer Manager" : `Customer Manager ${index + 1}`,
                    `customerManager${index}`,
                    values[`customerManager${index}`],
                    <Autocomplete
                      fullWidth
                      options={customerManagers}
                      value={values[`customerManager${index}`] || null}
                      onChange={(event, newValue) => {
                        setFieldValue(`customerManager${index}`, newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={textFieldStyles}
                          error={!!touched[`customerManager${index}`] && !!errors[`customerManager${index}`]}
                          helperText={touched[`customerManager${index}`] && errors[`customerManager${index}`]}
                        />
                      )}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />,
                    1,
                    true // isDropdown flag
                  )}

                  {/* Add/Remove Buttons Column */}
                  <Box sx={{ gridColumn: "span 1", gap: "10px", alignItems: "center", display: isEditing ? "flex" : "none", marginTop:"30px"  }}>
                    {index === orgManagerPairs.length - 1 ? (
                      <Button
                        variant="outlined"
                        onClick={addOrgManagerPair}
                        sx={{ minWidth: '100px', height: '40px', backgroundColor: colors.blueAccent[700], color: "#ffffff" }}
                      >
                        Add More
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => removeOrgManagerPair(index)}
                        sx={{ minWidth: '100px', height: '40px', backgroundColor: '#ffebee' }}
                        color="error"
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              ))}
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="24px">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    backgroundColor: colors.blueAccent[700],
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": { backgroundColor: colors.blueAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                  }}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                      transition: "0.3s",
                      backgroundColor: colors.blueAccent[700],
                      color: "#ffffff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: colors.blueAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleCancel}
                    sx={{
                      padding: "12px 24px",
                      marginLeft: "10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                      transition: "0.3s",
                      backgroundColor: colors.redAccent[600],
                      color: "#ffffff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: colors.redAccent[700], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CrmDetails;