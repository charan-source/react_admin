import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
// import Header from "../../components/Header";
import { Country, State, City } from 'country-state-city';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const CrmForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [orgManagerPairs, setOrgManagerPairs] = useState([{ org: "", manager: "" }]);

  const handleFormSubmit = (values) => {
    console.log("Form Data:", values);
  };

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    street: "",
    city: "",
    state: "",
    country: "",
    email: "",
    PhoneNo: "",
    organization0: "",
    customerManager0: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required("Required"),
    designation: yup.string().required("Required"),
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
    organization0: yup.string().required("Required"),
    customerManager0: yup.string().required("Required"),
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#999",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
      },
      padding: "8px 12px", // Adjust padding to reduce height
      height: "50px", // Set a fixed height for the input
    },
    "& .MuiInputLabel-root": {
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  // const addOrganization = () => {
  //   setOrganizations([...organizations, ""]);
  // };

  // const removeOrganization = (index) => {
  //   if (organizations.length > 1) {
  //     const updatedOrgs = [...organizations];
  //     updatedOrgs.splice(index, 1);
  //     setOrganizations(updatedOrgs);
  //   }
  // };

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

  // const handleFormSubmit = (values) => {
  //   const allPairs = orgManagerPairs.map((_, index) => ({
  //     organization: values[`organization${index}`],
  //     customerManager: values[`customerManager${index}`]
  //   }));

  //   const formData = {
  //     ...values,
  //     orgManagerPairs: allPairs,
  //   };

  //   console.log("Form Data:", formData);
  // };

  // Get all countries
  const countries = Country.getAllCountries();

  // Get states based on selected country
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

  // Get cities based on selected state
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];


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
    <Box m="15px" sx={{
      backgroundColor: "#ffffff", padding: "20px"

    }}>
      {/* <Header title="Create CM" subtitle="Create a New Customer Manager Profile" /> */}

      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit} sx={{ backgroundColor: "#ffffff" }}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} >
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? "span 4" : undefined },
                backgroundColor: "#ffffff",
                //  padding:"10px"
              }}
            >
              {[
                { label: "First Name", name: "firstName" },
                { label: "Middle Name", name: "middleName" },
                { label: "Last Name", name: "lastName" },
                // { label: "Designation", name: "designation" },
                // { label: "Street", name: "street" },
                // { label: "City", name: "city" },
                // { label: "State", name: "state" },
                // { label: "Country", name: "country" },
                // { label: "Email Id", name: "email", type: "email" },
                // { label: "Phone No", name: "PhoneNo", type: "text" },
                // { label: "Subject", name: "subject" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched[field.name] && !!errors[field.name]}
                  helperText={touched[field.name] && errors[field.name]}
                  sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                />
              ))}

              <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px" }}>
                {/* Phone Code Dropdown */}
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
                      label="Phone Code"
                      sx={textFieldStyles}
                      error={!!touched.phoneCode && !!errors.phoneCode}
                      helperText={touched.phoneCode && errors.phoneCode}

                    />
                  )}

                />

                {/* Phone Number Input */}
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Phone No"
                  name="PhoneNo"
                  value={values.PhoneNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.PhoneNo && !!errors.PhoneNo}
                  helperText={touched.PhoneNo && errors.PhoneNo}
                  sx={textFieldStyles}

                />
              </Box>

              {[


                { label: "Email Id", name: "email", type: "email" },

              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched[field.name] && !!errors[field.name]}
                  helperText={touched[field.name] && errors[field.name]}
                  sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                />
              ))}

              <Autocomplete
                fullWidth
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                  setSelectedState(null); // Reset state when country changes
                  setSelectedCity(null); // Reset city when country changes
                  setFieldValue("country", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    sx={textFieldStyles}
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
              />

              {/* State Dropdown */}
              <Autocomplete
                fullWidth
                options={states}
                getOptionLabel={(option) => option.name}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedCity(null); // Reset city when state changes
                  setFieldValue("province", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State/Province"
                    sx={textFieldStyles}
                    error={!!touched.province && !!errors.province}
                    helperText={touched.province && errors.province}
                    disabled={!selectedCountry}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                disabled={!selectedCountry}
              />

              {/* City Dropdown */}
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
                    label="City"
                    sx={textFieldStyles}
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    disabled={!selectedState}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                disabled={!selectedState}
              />

              {[

                { label: "Postal Code", name: "postcode" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched[field.name] && !!errors[field.name]}
                  helperText={touched[field.name] && errors[field.name]}
                  sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                />
              ))}


              {orgManagerPairs.map((pair, index) => (
                <React.Fragment key={`pair-${index}`}>
                  {/* Organization Field */}
                  <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px", alignItems: "center" }}>
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
                          label={index === 0 ? "Organization" : `Organization ${index + 1}`}
                          sx={textFieldStyles}
                          error={!!touched[`organization${index}`] && !!errors[`organization${index}`]}
                          helperText={touched[`organization${index}`] && errors[`organization${index}`]}
                        />
                      )}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />
                  </Box>

                  {/* Customer Manager Field */}
                  <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px", alignItems: "center" }}>
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
                          label={index === 0 ? "Customer Manager" : `Customer Manager ${index + 1}`}
                          sx={textFieldStyles}
                          error={!!touched[`customerManager${index}`] && !!errors[`customerManager${index}`]}
                          helperText={touched[`customerManager${index}`] && errors[`customerManager${index}`]}
                        />
                      )}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />
                  </Box>

                  {/* Add/Remove Buttons Column */}
                  <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px", alignItems: "center" }}>
                    {index === orgManagerPairs.length - 1 ? (
                      <Button
                        variant="outlined"
                        onClick={addOrgManagerPair}
                        sx={{ minWidth: '100px', height: '40px',  backgroundColor: colors.blueAccent[700] , color:"#ffffff"}}
                      >
                        Add More
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => removeOrgManagerPair(index)}
                        sx={{ minWidth: '100px', height: '40px',  backgroundColor: '#ffebee' }}
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
              // onClick = {handleFormSubmit} 
              >

                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CrmForm;
