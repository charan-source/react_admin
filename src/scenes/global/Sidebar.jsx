import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoLight from "./logo.png";

// Shared getActivePage function
const getActivePage = (pathname) => {
  if (pathname.includes("/crm") || pathname.includes("/crmform")) {
    return "/crm";
  } else if (pathname.includes("/cm") || pathname.includes("/cmform")) {
    return "/cm";
  } else if (pathname.includes("/hob") || pathname.includes("/form")) {
    return "/hob";
  }
  else if (pathname.includes("/notes")) {
    return "/notes";
   }  else if (pathname.includes("/calendar")) {
    return "/calendar";
  }else if (
    pathname === "/" ||
    pathname.includes("/allExperiences") ||
    pathname.includes("/newExperiences") ||
    pathname.includes("/pendingExperiences") ||
    pathname.includes("/resolvedExperiences")
  ) {
    return "/"; // Dashboard is active for these routes
  } else {
    return pathname;
  }
};

// Sidebar Item Component
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === to}
      style={{
        color: selected === to ? "white" : colors.blueAccent[500],
        fontWeight: selected === to ? "bold" : "regular",
        backgroundColor: selected === to ? colors.blueAccent[700] : "inherit",
        transition: "background-color 0.3s ease",
        borderRadius: 10,
        "&:hover": {
          backgroundColor: colors.blueAccent[300],
          color: "white",
        },
      }}
      onClick={() => {
        setSelected(to);
        sessionStorage.setItem("selectedSidebarItem", to);
      }}
      icon={<Box sx={{ display: "flex", alignItems: "center", background: "none" }}>{icon}</Box>}
    >
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

// Sidebar Component
const Sidebar = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();
  const [selected, setSelected] = useState(getActivePage(location.pathname));

  useEffect(() => {
    setSelected(getActivePage(location.pathname));
    sessionStorage.setItem("selectedSidebarItem", location.pathname);
  }, [location.pathname]);

  const logoSrc = logoLight;

  return (
    <Box
      sx={{
        position: isMobile ? "absolute" : "fixed",
        left: 0,
        top: 0,
        width: "270px",
        height: "100vh",
        background: colors.primary[500],
        display: "flex",
        flexDirection: "column",
        zIndex: isMobile ? 1300 : 1,
        "& .pro-sidebar-inner": { background: "#ffffff !important" },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-menu-item.active": { color: "#fff !important" },
      }}
    >
      {/* Sidebar Logo */}
      <Box
        alignItems="center"
        sx={{
          width: "100%",
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.1)",
          paddingBottom: 1,
        }}
      >
        <img src={logoSrc} alt="logo" style={{ width: "100%", cursor: "pointer" }} />
      </Box>

      <ProSidebar>
        <Menu iconShape="square" style={{ padding: "20px", borderRadius: "20px" }}>
          <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Customer Manager" to="/cm" icon={<PeopleAltOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item
            title={
              <div style={{ fontWeight: "bold", textAlign: "flex-start" }}>
                Customer Relationship <br /> Manager
              </div>
            }
            to="/crm"
            icon={<HandshakeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
           <Item title="Head of the Business" to="/hob" icon={<BusinessOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Notes" to="/notes" icon={<BusinessOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;