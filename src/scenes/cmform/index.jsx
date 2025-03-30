import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { Country, State, City } from 'country-state-city';
import React, { useState, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  const cropWidth = mediaWidth * 0.9;
  const cropHeight = cropWidth / aspect;

  const cropX = (mediaWidth - cropWidth) / 2;
  const cropY = (mediaHeight - cropHeight) / 2;

  return {
    unit: '%',
    x: cropX / mediaWidth * 100,
    y: cropY / mediaHeight * 100,
    width: cropWidth / mediaWidth * 100,
    height: cropHeight / mediaHeight * 100
  };
}

const CmForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);
  // const previewCanvasRef = useRef(null);

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      profileImage: profileImage
    };
    console.log("Form Data:", formData);
  };

  // ... (keep all your existing initialValues, checkoutSchema, textFieldStyles, and other constants)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const handleCropImage = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleSaveCroppedImage = async () => {
    await handleCropImage();
    setCropModalOpen(false);
  };


  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    designation: "",
    street: "",
    city: "",
    state: "",
    country: "",
    email: "",
    PhoneNo: "",
    organization: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required("Required"),
    gender: yup.string().required("Required"),
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
    organization: yup.string().required("Required"),
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
      padding: "8px 12px",
      height: "50px",
    },
    "& .MuiInputLabel-root": {
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];
  const organization = ["Wipro", "Infosys", "TCS", "HCL", "Tech Mahindra"];
  const gender = ["Male", "Female"];

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {/* Profile Photo Section */}
            <Box display="flex" justifyContent="center" mb="20px">
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={profileImage || "https://via.placeholder.com/150"}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `2px solid ${colors.primary[500]}`,
                    cursor: 'pointer'
                  }}
                  onClick={triggerFileInput}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: colors.blueAccent[500],
                    '&:hover': {
                      backgroundColor: colors.blueAccent[600],
                    }
                  }}
                  onClick={triggerFileInput}
                >
                  <PhotoCamera />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </Box>
            </Box>

            {/* Crop Modal */}
            <Dialog open={cropModalOpen} onClose={() => setCropModalOpen(false)} maxWidth="md">
              <DialogTitle>Crop Profile Picture</DialogTitle>
              <DialogContent>
                {originalImage && (
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={handleCropComplete}
                    aspect={1}
                    circularCrop
                  >
                    <img
                      ref={imgRef}
                      src={originalImage}
                      onLoad={onImageLoad}
                      style={{ maxHeight: '70vh', maxWidth: '100%' }}
                      alt="Crop preview"
                    />
                  </ReactCrop>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setCropModalOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSaveCroppedImage} color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? "span 4" : undefined },
                backgroundColor: "#ffffff",
              }}
            >
              {[
                { label: "First Name", name: "firstName" },
                { label: "Middle Name", name: "middleName" },
                { label: "Last Name", name: "lastName" },
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

              <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px" }}>
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

              <Autocomplete
                fullWidth
                options={gender}
                value={values.gender || null}
                onChange={(event, newValue) => {
                  setFieldValue("gender", newValue || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    sx={textFieldStyles}
                    error={!!touched.gender && !!errors.gender}
                    helperText={touched.gender && errors.gender}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                freeSolo
                forcePopupIcon
                popupIcon={<ArrowDropDownIcon />}
              />

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
                    label="Country"
                    sx={textFieldStyles}
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
              />

              <Autocomplete
                fullWidth
                options={states}
                getOptionLabel={(option) => option.name}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedCity(null);
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
                { label: "Designation", name: "designation" },
                { label: "Street Address", name: "street" },
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

              <Autocomplete
                fullWidth
                options={organization}
                value={values.organization || null}
                onChange={(event, newValue) => {
                  setFieldValue("organization", newValue || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Organization"
                    sx={textFieldStyles}
                    error={!!touched.organization && !!errors.organization}
                    helperText={touched.organization && errors.organization}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                freeSolo
                forcePopupIcon
                popupIcon={<ArrowDropDownIcon />}
              />
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
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
                  },
                }}
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

export default CmForm;