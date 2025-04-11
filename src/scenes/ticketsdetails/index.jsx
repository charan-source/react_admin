import { Box, useMediaQuery, Typography, Button, useTheme, TextField, Autocomplete, IconButton } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import download from 'downloadjs';
// import JoditEditor from 'jodit-react';
// import {Jodit} from 'jodit-pro';
// import 'jodit-pro/es5/jodit.min.css';


// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';



import {
  FormatBold, FormatItalic, FormatUnderlined,
  FormatListNumbered, FormatListBulleted,
  InsertPhoto, TableChart, YouTube
} from '@mui/icons-material';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Youtube from '@tiptap/extension-youtube'




import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { Block } from "@mui/icons-material";
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import HelpIcon from '@mui/icons-material/Help';

const TicketDetails = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:600px)");
  // const isMobile = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:800px)");
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const colors = tokens(theme.palette.mode);
  // const editor = useRef(null);

  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

  const getExperienceColor = (experience) => {
    switch (experience) {
      case "Frustrated": return "#E64A19";
      case "Extremely Frustrated": return "#D32F2F";
      case "Happy": return "#FBC02D";
      case "Extremely Happy": return "#388E3C";
      default: return "#616161";
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
    branch: ticket.branch || "",
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
    id: ticket.id || "",
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    cmname: yup.string().required("Required"),
    crmname: yup.string().required("Required"),
    status: yup.string().required("Required"),
    branch: yup.string().required("Required"),
    department: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    subject: yup.string().required("Required"),
    phoneCode: yup.string().required("Required"),
    PhoneNo: yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    notes: yup.string(),
  });

  const fileUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/4d/sample.jpg';
  const filename = 'sample-file.jpg';

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      download(blob, filename);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  // const config = {
  //   readonly: false,
  //   buttons: ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', '|', 'link'],
  // };

  // Add these state variables at the top of your component
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "support" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  // const [newMessage, setNewMessage] = useState("");


  // Add this function to handle sending messages
  // const config = {
  //   readonly: false,
  //   toolbar: false, // Hide toolbar for cleaner chat input
  //   statusbar: false,
  //   spellcheck: true,
  //   enter: "br", // Enter creates <br> instead of <p>
  //   defaultActionOnPaste: "insert_only_text",
  //   buttons: [],
  //   height: 100,
  //   width: '100%',
  //   style: {
  //     background: '#fff',
  //     color: '#333',
  //     fontSize: '14px',
  //     border: `1px solid ${colors.grey[300]}`,
  //     borderRadius: '4px',
  //     padding: '8px'
  //   }
  // };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube,
    ],
    content: newMessage,
    onUpdate: ({ editor }) => {
      setNewMessage(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ 
      rows: 3, 
      cols: 3, 
      withHeaderRow: true 
    }).run();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, {
      text: newMessage,
      sender: "user"
    }]);
    setNewMessage("");
    editor.commands.clearContent();

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "We've received your message with attachments!",
        sender: "support"
      }]);
    }, 1000);
  };

  // Function to safely render HTML content
  // const renderMessageContent = (html) => {
  //   return { __html: html.replace(/\n/g, '<br>') };
  // };



  // const modules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline'],
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //     ['link']
  //   ]
  // };

  // const formats = [
  //   'bold', 'italic', 'underline',
  //   'list', 'bullet',
  //   'link'
  // ];

  const customerManagers = [
    "Rambabu",
    "Charan",
    "Lakshman",
    "Satya dev",
    "Ram",
  ];


  const priority = [
    "Urgent",
    "High",
    "Low",
  ];

  const status = [
    "Peding",
    "Processing",
    "Closed",
  ];
  return (
    <Box sx={{
      display: "flex",
      flexDirection: isLargeScreen ? "row" : "column",
      gap: 2,
      p: isDesktop ? 3 : 2
    }}>
      {/* First Column - Ticket Details */}
      <Box sx={{
        backgroundColor: "#ffffff",
        p: isDesktop ? 3 : 2,
        borderRadius: "8px",
        flex: 1,
        maxWidth: isLargeScreen ? "60%" : "100%",
        width: isLargeScreen ? "60%" : "100%"
      }}>
        <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
          {({ values, setFieldValue, touched, errors }) => (
            <form>
              <Box
                display="grid"
                gap={2}
                gridTemplateColumns={{
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)"
                }}
              >
                {/* Ticket Details Fields */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Experience ID</Typography>
                  <Typography>{values.id}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Organization</Typography>
                  <Typography>{values.organization}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Branch</Typography>
                  <Typography>{values.branch}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Customer Manager</Typography>
                  <Typography>{values.cmname}</Typography>
                </Box>

                {isEditing ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>
                      Customer Relationship Manager
                    </Typography>
                    <Autocomplete
                      fullWidth
                      options={customerManagers}
                      value={values.crmname || null}
                      onChange={(event, newValue) => {
                        setFieldValue("crmname", newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            display: isEditing ? "block" : "none",
                            '& .MuiInputBase-root': {  // Target the input container
                              height: '40px',          // Adjust input height
                            }
                          }}
                          error={!!touched.crmname && !!errors.crmname}
                          helperText={touched.crmname && errors.crmname}
                          disabled={!isEditing}
                        />
                      )}
                      disabled={!isEditing}
                      sx={{
                        gridColumn: "span 1",
                        '& .MuiAutocomplete-listbox': {  // Target the dropdown list
                          maxHeight: '200px',           // Set maximum height
                          padding: 0,                   // Remove default padding
                          '& .MuiAutocomplete-option': { // Target each option
                            minHeight: '32px',          // Reduce option height
                            padding: '4px 16px',        // Adjust padding
                          }
                        }
                      }}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />
                  </Box>
                ) : (
                  <Box sx={{ gridColumn: { xs: "auto", sm: "span 2", md: "auto" } }}>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Customer Relationship Manager</Typography>
                    <Typography>{values.crmname}</Typography>
                  </Box>
                )}
                {isEditing ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold", marginBottom: "5px" }}>
                      Priority
                    </Typography>
                    <Autocomplete
                      fullWidth
                      options={priority}
                      value={values.priority || null}
                      onChange={(event, newValue) => {
                        setFieldValue("priority", newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            display: isEditing ? "block" : "none",
                            '& .MuiInputBase-root': {  // Target the input container
                              height: '40px',          // Adjust input height
                            }
                          }}
                          error={!!touched.priority && !!errors.priority}
                          helperText={touched.priority && errors.priority}
                          disabled={!isEditing}
                        />
                      )}
                      disabled={!isEditing}
                      sx={{
                        gridColumn: "span 1",
                        '& .MuiAutocomplete-listbox': {  // Target the dropdown list
                          maxHeight: '200px',           // Set maximum height
                          padding: 0,                   // Remove default padding
                          '& .MuiAutocomplete-option': { // Target each option
                            minHeight: '32px',          // Reduce option height
                            padding: '4px 16px',        // Adjust padding
                          }
                        }
                      }}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Priority</Typography>
                    <Typography sx={{ color: getExperienceColor(values.priority) }}>{values.priority}</Typography>

                  </Box>
                )}


                {/* 
                {isEditing ? (
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Status</Typography>
                
                    <TextField
                      fullWidth
                      placeholder="Type your message..."
                      size="small"
                      variant="outlined"
                      value={values.status}
   
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Status</Typography>
                    <Typography>{values.status}</Typography>
                  </Box>
                )} */}



                {isEditing ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold", marginBottom: "5px" }}>
                      Status
                    </Typography>
                    <Autocomplete
                      fullWidth
                      options={status}
                      value={values.status || null}
                      onChange={(event, newValue) => {
                        setFieldValue("priority", newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            display: isEditing ? "block" : "none",
                            '& .MuiInputBase-root': {  // Target the input container
                              height: '40px',          // Adjust input height
                            }
                          }}
                          error={!!touched.status && !!errors.status}
                          helperText={touched.status && errors.status}
                          disabled={!isEditing}
                        />
                      )}
                      disabled={!isEditing}
                      sx={{
                        gridColumn: "span 1",
                        '& .MuiAutocomplete-listbox': {  // Target the dropdown list
                          maxHeight: '200px',           // Set maximum height
                          padding: 0,                   // Remove default padding
                          '& .MuiAutocomplete-option': { // Target each option
                            minHeight: '32px',          // Reduce option height
                            padding: '4px 16px',        // Adjust padding
                          }
                        }
                      }}
                      freeSolo
                      forcePopupIcon
                      popupIcon={<ArrowDropDownIcon />}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Status</Typography>
                    <Typography sx={{ color: getExperienceColor(values.priority) }}>{values.status}</Typography>

                  </Box>
                )}


                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Date</Typography>
                  <Typography>{values.date}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Time</Typography>
                  <Typography>{values.time}</Typography>
                </Box>


                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Experience</Typography>
                  <Typography sx={{ color: getExperienceColor(values.experience) }}>{values.experience}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Impact</Typography>
                  <Typography>{values.department}</Typography>
                </Box>

                <Box sx={{ gridColumn: { xs: "auto", sm: "span 2", md: "span 3" } }}>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Subject</Typography>
                  <Typography>{values.subject}</Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Request Details Section with Edit Functionality */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>Request Details</Typography>
                    {/* {!isEditing && (
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(true)}
                        sx={{
                          textTransform: 'none',
                          color: colors.blueAccent[700],
                          borderColor: colors.blueAccent[700],
                          '&:hover': {
                            backgroundColor: colors.blueAccent[50],
                            borderColor: colors.blueAccent[700]
                          }
                        }}
                      >
                        Edit
                      </Button>
                    )} */}
                  </Box>

                  {/* {!isEditing ? ( */}
                  <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>{values.requestdetails}</Typography>
                  {/* ) : (
                    <>
                      <Box sx={{ mt: 2 }}>
                        <JoditEditor
                          value={values.requestdetails}
                          config={config}
                          onChange={(newContent) => { }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => setIsEditing(false)}
                          sx={{
                            textTransform: 'none',
                            color: colors.grey[700],
                            borderColor: colors.grey[700]
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            // Handle save logic here
                            setIsEditing(false);
                          }}
                          sx={{
                            textTransform: 'none',
                            backgroundColor: colors.blueAccent[700],
                            '&:hover': { backgroundColor: colors.blueAccent[600] }
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </>
                  )} */}
                </Box>

                {/* File Upload Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                    width: "fit-content",
                    cursor: "pointer",
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #ccc"
                  }}
                >
                  <Box component="label" htmlFor="fileInput" sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="20"
                      height="20"
                      fill="#555"
                      style={{ marginRight: "8px" }}
                    >
                      <path d="M64 480H296.2C305.1 491.8 317.3 502.3 329.7 511.3C326.6 511.7 323.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H220.1C232.8 0 245.1 5.057 254.1 14.06L369.9 129.9C378.9 138.9 384 151.2 384 163.9V198.6C372.8 201.8 362.1 206 352 211.2V192H240C213.5 192 192 170.5 192 144V32H64C46.33 32 32 46.33 32 64V448C32 465.7 46.33 480 64 480V480zM347.3 152.6L231.4 36.69C229.4 34.62 226.8 33.18 224 32.48V144C224 152.8 231.2 160 240 160H351.5C350.8 157.2 349.4 154.6 347.3 152.6zM448 351.1H496C504.8 351.1 512 359.2 512 367.1C512 376.8 504.8 383.1 496 383.1H448V431.1C448 440.8 440.8 447.1 432 447.1C423.2 447.1 416 440.8 416 431.1V383.1H368C359.2 383.1 352 376.8 352 367.1C352 359.2 359.2 351.1 368 351.1H416V303.1C416 295.2 423.2 287.1 432 287.1C440.8 287.1 448 295.2 448 303.1V351.1zM576 368C576 447.5 511.5 512 432 512C352.5 512 288 447.5 288 368C288 288.5 352.5 224 432 224C511.5 224 576 288.5 576 368zM432 256C370.1 256 320 306.1 320 368C320 429.9 370.1 480 432 480C493.9 480 544 429.9 544 368C544 306.1 493.9 256 432 256z" />
                    </svg>
                    <Typography variant="body2">
                      {selectedFile ? selectedFile.name : "Attach Files"}
                    </Typography>
                  </Box>
                  <input
                    id="fileInput"
                    type="file"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                      fontSize: 0
                    }}
                    onChange={handleFileChange}
                  />
                </Box>

                {/* Download Button */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    disabled={isDownloading}
                    onClick={handleDownload}
                    sx={{ minWidth: 180 }}
                  >
                    {isDownloading ? 'Downloading...' : 'Download Attachment'}
                  </Button>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                      transition: "0.3s",
                      backgroundColor: colors.redAccent[400],
                      color: "#ffffff",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: colors.redAccent[500],
                        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
                      },
                    }}
                  >
                    Delete
                  </Button>

                  {/* <Button
                    variant="contained"
                    onClick={setIsEditing}
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

                    Edit
                  </Button> */}
                  {isEditing ? (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => setIsEditing(false)}
                        sx={{
                          padding: "12px 24px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                          transition: "0.3s",
                          backgroundColor: colors.redAccent[400],
                          color: "#ffffff",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
                          },
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
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
                        Save
                      </Button>
                    </Box>
                  ) :
                    (
                      <Button
                        variant="contained"
                        onClick={setIsEditing}
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

                        Edit
                      </Button>
                    )}
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      {/* Second Column - Customer Support */}
      <Box sx={{
        backgroundColor: "#ffffff",
        p: isDesktop ? 3 : 2,
        borderRadius: "8px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: isLargeScreen ? "40%" : "100%",
        width: isLargeScreen ? "40%" : "100%",
      }}>
        {/* Chat Section */}
        <Box sx={{
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          display: 'flex',
          flexDirection: 'column',
          minHeight: isDesktop ?  '0px' :  '520px', // Minimum height for chat section
          maxHeight: isDesktop ? '600px' :  '520px' // Increased overall height
        }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}> Chat Support</Typography>
          <Typography sx={{ mb: 2, color: colors.grey[600] }}>Get immediate help from our support team</Typography>
          
          {/* Messages Display */}
          <Box sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: "4px",
            p: 2,
            mb: 2,
            border: "1px solid #ddd",
            overflowY: "auto",
            minHeight: '200px', // Minimum height for messages
            maxHeight: '800px' // Fixed height for messages
          }}>
            {messages.map((message, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: colors.grey[600] }}>
                  {message.sender === "user" ? "You" : "Support"}
                </Typography>
                <Box 
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: message.sender === "user" 
                      ? colors.blueAccent[100] 
                      : "#f0f0f0",
                    display: 'inline-block'
                  }}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
              </Box>
            ))}
          </Box>

          {/* Tiptap Editor */}
          <Box sx={{ 
            backgroundColor: 'white',
            borderRadius: '4px',
            border: `1px solid ${colors.grey[300]}`,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Toolbar */}
            {editor && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                p: 1,
                borderBottom: `1px solid ${colors.grey[300]}`,
                flexWrap: 'wrap'
              }}>
                <IconButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  color={editor.isActive('bold') ? 'primary' : 'default'}
                  size="small"
                >
                  <FormatBold fontSize="small" />
                </IconButton>
                
                <IconButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  color={editor.isActive('italic') ? 'primary' : 'default'}
                  size="small"
                >
                  <FormatItalic fontSize="small" />
                </IconButton>
                
                <IconButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  color={editor.isActive('underline') ? 'primary' : 'default'}
                  size="small"
                >
                  <FormatUnderlined fontSize="small" />
                </IconButton>
                
                <IconButton
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  color={editor.isActive('bulletList') ? 'primary' : 'default'}
                  size="small"
                >
                  <FormatListBulleted fontSize="small" />
                </IconButton>
                
                <IconButton
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  color={editor.isActive('orderedList') ? 'primary' : 'default'}
                  size="small"
                >
                  <FormatListNumbered fontSize="small" />
                </IconButton>
                
                <IconButton onClick={addImage} size="small">
                  <InsertPhoto fontSize="small" />
                </IconButton>
                
                <IconButton onClick={addTable} size="small">
                  <TableChart fontSize="small" />
                </IconButton>
                
                <IconButton onClick={addYoutubeVideo} size="small">
                  <YouTube fontSize="small" />
                </IconButton>
              </Box>
            )}
            
            {/* Editor Content - Now with larger height */}
            <Box sx={{ 
              flex: 1,
              overflowY: 'auto',
              p: 2,
              minHeight: '100px', // Minimum height
              maxHeight: '100px', // Maximum height before scrolling
              '& .tiptap': {
                minHeight: '200px', // Ensure the editor has enough space
                outline: 'none',
                '& p': {
                  margin: 0,
                  marginBottom: '0.5em'
                }
              }
            }}>
              <EditorContent editor={editor} />
            </Box>
            
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
              // backgroundColor: "#f5f5f5",
              borderTop: `1px solid ${colors.grey[300]}`,
              maxHeight: '100px',
            }}>
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: "#ffffff",
                  '&:hover': { backgroundColor: colors.blueAccent[600] },
                  textTransform: 'none',
                  // minWidth: '100px'
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketDetails;