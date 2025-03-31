import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import Poppins font weights
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Import components
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Cm from "./scenes/cm";
import Hob from "./scenes/hob";
import Crm from "./scenes/crm";
import Organization from "./scenes/organization";
import AllExperiences from "./scenes/experiences/allExperiences";
import NewExperiences from "./scenes/experiences/newExperiences";
import PendingExperiences from "./scenes/experiences/pendingExperiences";
import ResolvedExperiences from "./scenes/experiences/resolvedExperiences";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Profile from "./scenes/profile";
import Notes from "./scenes/notes";
import CmDetails from "./scenes/cmdetails";
import CrmDetails from "./scenes/crmdetails";
import OrganizationDetails from "./scenes/organizationdetails";
import HobDetails from "./scenes/hobdetails";
import TicketDetails from "./scenes/ticketsdetails";
import Form from "./scenes/form";
import CmForm from "./scenes/cmform";
import CrmForm from "./scenes/crmform";
import BsuForm from "./scenes/bsuform";
import OrganizationForm from "./scenes/organizationform";
import Login from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Create theme with Poppins font
  const appTheme = createTheme(theme, {
    typography: {
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: 'Poppins, sans-serif',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]); // Add location.pathname as dependency

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'dummy-auth-token');
    return <Navigate to="/" replace />;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  };

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        
        {isAuthenticated ? (
          <>
            {/* Dashboard Layout */}
            <Box sx={{ width: "100vw", top: 5, zIndex: 1000 }}>
              <Topbar setIsSidebar={setIsSidebar} onLogout={handleLogout} />
            </Box>

            {!isMobile && isSidebar && (
              <Box
                sx={{
                  position: "fixed",
                  left: 0,
                  top: "64px",
                  height: "calc(100vh - 64px)",
                  width: "260px",
                  zIndex: 900,
                }}
              >
                <Sidebar isSidebar={isSidebar} onLogout={handleLogout} />
              </Box>
            )}

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginLeft: isMobile ? "0px" : isSidebar ? "260px" : "0px",
                padding: "20px 20px 20px",
                overflowY: "auto",
                transition: "margin 0.3s ease-in-out",
                "&::-webkit-scrollbar": {
                  width: "1px",
                  height: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#000000",
                  borderRadius: "4px",
                },
                fontFamily: 'Poppins, sans-serif !important',
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cm" element={<Cm />} />
                <Route path="/crm" element={<Crm />} />
                <Route path="/hob" element={<Hob />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/allExperiences" element={<AllExperiences />} />
                <Route path="/newExperiences" element={<NewExperiences />} />
                <Route path="/pendingExperiences" element={<PendingExperiences />} />
                <Route path="/resolvedExperiences" element={<ResolvedExperiences />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/form" element={<Form />} />
                <Route path="/cmform" element={<CmForm />} />
                <Route path="/crmform" element={<CrmForm />} />
                <Route path="/bsuform" element={<BsuForm />} />
                <Route path="/organizationform" element={<OrganizationForm />} />
                <Route path="/cmdetails" element={<CmDetails />} />
                <Route path="/crmdetails" element={<CrmDetails />} />
                <Route path="/organizationdetails" element={<OrganizationDetails />} />
                <Route path="/hobdetails" element={<HobDetails />} />
                <Route path="/ticketdetails" element={<TicketDetails />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </Box>
          </>
         ) : (
          <Box>
            {/* Login Page - Full Screen */}
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
          </Box>
        )
        }
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;