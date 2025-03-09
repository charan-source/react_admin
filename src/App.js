import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Cm from "./scenes/cm";
import Hob from "./scenes/hob";
import Crm from "./scenes/crm";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import CmForm from "./scenes/cmform";
import CrmForm from "./scenes/crmform";
import BsuForm from "./scenes/bsuform";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Profile from "./scenes/profile";
// Import Experience Pages with Correct Naming
import AllExperiences from "./scenes/experiences/allExperiences";
import NewExperiences from "./scenes/experiences/newExperiences";
import PendingExperiences from "./scenes/experiences/pendingExperiences";
import ResolvedExperiences from "./scenes/experiences/resolvedExperiences";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cm" element={<Cm />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/hob" element={<Hob />} />
              <Route path="/form" element={<Form />} />
              <Route path="/cmform" element={<CmForm />} />
              <Route path="/crmform" element={<CrmForm />} />
              <Route path="/bsuform" element={<BsuForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Corrected Experience Routes */}
              <Route path="/allExperiences" element={<AllExperiences />} />
              <Route path="/newExperiences" element={<NewExperiences />} />
              <Route path="/pendingExperiences" element={<PendingExperiences />} />
              <Route path="/resolvedExperiences" element={<ResolvedExperiences />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
