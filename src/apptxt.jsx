import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box, useMediaQuery, ThemeProvider } from "@mui/material";
import { AuthContext, AuthProvider } from "./scenes/context";
import { ColorModeContext, useMode } from "./theme";

// Import fonts
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

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
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [theme] = useMode(); // Use theme from useMode
  const [isSidebar, setIsSidebar] = useState(true);
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {isAuthenticated && (
        <Box sx={{ width: "100vw", position: "fixed", top: 0, zIndex: 1000 }}>
          <Topbar setIsSidebar={setIsSidebar} onLogout={handleLogout} />
        </Box>
      )}

      {isAuthenticated && !isMobile && isSidebar && (
        <Box sx={{ position: "fixed", left: 0, top: "64px", height: "calc(100vh - 64px)", width: "260px", zIndex: 900 }}>
          <Sidebar isSidebar={isSidebar} onLogout={handleLogout} />
        </Box>
      )}

      <Box sx={{ marginLeft: isAuthenticated && !isMobile ? "260px" : 0, paddingTop: "64px", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cm" element={<Cm />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/hob" element={<Hob />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/allExperiences" element={<AllExperiences />} />
              <Route path="/newExperiences" element={<NewExperiences />} />
              <Route path="/pendingExperiences" element={<PendingExperiences />} />
              <Route path="/resolvedExperiences" element={<ResolvedExperiences />} />
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
              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
