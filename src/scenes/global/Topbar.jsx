import { Box, IconButton, useTheme, Typography, useMediaQuery, Modal, Backdrop } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import logoLight from "./logo.png";
import { useNavigate } from "react-router-dom";

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
   } else if (pathname.includes("/calendar")) {
    return "/calendar";
  } else if (
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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();
  const [selected, setSelected] = useState(getActivePage(location.pathname));
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/cm":
        return "Customer Manager";
      case "/crm":
        return "Customer Relationship Manager";
      case "/hob":
        return "Head of The Business";
      case "/cmform":
        return "Create a New Customer Manager";
      case "/crmform":
        return "Create a New Customer Relationship Manager";
      case "/form":
        return "Create a New Head of the Business Unit";
      case "/allExperiences":
        return "All Experiences";
      case "/newExperiences":
        return "New Experiences";
      case "/pendingExperiences":
        return "Pending Experiences";
      case "/resolvedExperiences":
        return "Resolved Experiences";
      case "/notes":
        return "Notes";
      case "/calendar":
        return "Calendar";
      default:
        return "Page Not Found";
    }
  };

  // Sync selected state with sessionStorage
  useEffect(() => {
    const storedSelected = sessionStorage.getItem("selectedSidebarItem");
    if (storedSelected) {
      setSelected(storedSelected);
    }
  }, []);

  useEffect(() => {
    setSelected(getActivePage(location.pathname));
    sessionStorage.setItem("selectedSidebarItem", getActivePage(location.pathname));
  }, [location.pathname]);

  const logoSrc = logoLight;

  return (
    <Box
      width="100%"
      sx={{
        bgcolor: "#fefefe !important",
        overflowX: "hidden",
      }}
    >
      {/* Topbar Container */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        bgcolor="#ffffff"
        sx={{ overflowX: "hidden", flex: 1, marginTop: 1, background: "ffffff", backgroundColor: "#ffffff" }}
      >
        {/* Header Section */}
        {isMobile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexShrink={0}
            width="100%"
            sx={{
              bgcolor: "#fefefe !important",
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.1)",
              marginBottom: 2,
              padding: 2,
            }}
          >
            {/* Logo on Mobile */}
            <Box sx={{ maxWidth: "180px", height: "50px", backgroundColor: "#fefefe !important" }}>
              <img
                src={logoSrc}
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton onClick={() => setIsModalOpen(true)}>
              <MenuOutlinedIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        )}

        {/* Greeting and Profile Section */}
        {isMobile ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            flexShrink={0}
            sx={{
              bgcolor: "transparent",
              paddingX: isMobile ? 2 : 9,
              paddingY: 1,
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.1)",
              padding: 4,
            }}
          >
            {/* Greeting Message */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                padding: "8px",
                paddingLeft: isMobile ? "12px" : "20px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography sx={{ color: "#8d8d8d", fontSize: isMobile ? "30px" : "25px" }}>
                Good Evening Delphin
              </Typography>
              <Typography sx={{ color: "#8d8d8d", fontSize: isMobile ? "16px" : "16px" }}>
                March 13th 2025, 7:40 PM
              </Typography>
            </Box>

            {/* Profile Section */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                width: "fit-content",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => navigate("profile")} sx={{ gap: 1 }}>
                <Box
                  sx={{
                    width: isMobile ? 25 : 30,
                    height: isMobile ? 25 : 30,
                    borderRadius: "50%",
                    backgroundColor: colors.blueAccent[500],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonOutlinedIcon sx={{ fontSize: isMobile ? 18 : 20, color: "#fff" }} />
                </Box>
                <Typography sx={{ color: "#000", fontSize: isMobile ? 15 : 17 }}>
                  Delphin
                </Typography>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            flexShrink={0}
            sx={{
              bgcolor: "#ffffff",
              paddingX: isMobile ? 2 : 4,
              paddingLeft: 35,
            }}
          >
            {/* Greeting Message */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                padding: "8px",
                paddingRight: "30px",
                paddingLeft: isMobile ? "12px" : "20px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography sx={{ color: "#8d8d8d", fontSize: isMobile ? "20px" : "25px" }}>
                Good Evening Delphin
              </Typography>
              <Typography sx={{ color: "#8d8d8d", fontSize: isMobile ? "14px" : "16px" }}>
                March 13th 2025, 7:40 PM
              </Typography>
            </Box>

            {/* Profile Section */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                width: "fit-content",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => navigate("profile")} sx={{ gap: 1 }}>
                <Box
                  sx={{
                    width: isMobile ? 25 : 30,
                    height: isMobile ? 25 : 30,
                    borderRadius: "50%",
                    backgroundColor: colors.blueAccent[500],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonOutlinedIcon sx={{ fontSize: isMobile ? 18 : 20, color: "#fff" }} />
                </Box>
                <Typography sx={{ color: "#000", fontSize: isMobile ? 15 : 17 }}>
                  Delphin
                </Typography>
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Page Title Section */}
        {isMobile ? (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            flexShrink={0}
            sx={{
              backgroundColor: colors.blueAccent[700],
              paddingX: isMobile ? 2 : 4,
              boxShadow: "0px 4px 8px -2px rgba(62, 67, 150, 0.5)",
              padding: "20px",
            }}
          >
            {/* Greeting Message */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                padding: "8px",
                paddingLeft: isMobile ? "12px" : "20px",
                textAlign: isMobile ? "text" : "text",
              }}
            >
              <Typography sx={{ color: "#ffffff", fontSize: isMobile ? "20px" : "25px" }}>
                {getPageTitle()}
              </Typography>
              <Box sx={{ color: "#ffffff", fontSize: isMobile ? "14px" : "16px", alignItems: "center", gap: 1, justifyContent: "center" }}>
                <HomeOutlinedIcon /> / {getPageTitle()}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            flexShrink={0}
            sx={{
              backgroundColor: colors.blueAccent[500],
              paddingX: isMobile ? 2 : 4,
              paddingLeft: 35,
            }}
          >
            {/* Greeting Message */}
            <Box
              borderRadius="3px"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                padding: "8px",
                paddingLeft: isMobile ? "12px" : "20px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography sx={{ color: "#ffffff", fontSize: isMobile ? "20px" : "25px" }}>
                {getPageTitle()}
              </Typography>
              <Box display="flex">
                <Typography sx={{ color: "#ffffff", fontSize: isMobile ? "14px" : "16px" }}>
                  <HomeOutlinedIcon onClick={() => navigate('/')} /> /
                </Typography>
                <Typography sx={{ color: "#ffffff", fontSize: isMobile ? "14px" : "16px" }}>
                  {getPageTitle()}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Mobile Sidebar Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Semi-transparent black backdrop
        }}
      >
        <Box
          width="65%"
          sx={{
            background: colors.primary[400],
            height: "100vh",
            position: "absolute",
            left: 0,
            top: 0,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MenuItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Customer Manager"
            to="/cm"
            icon={<PeopleAltOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Customer Relationship Manager"
            to="/crm"
            icon={<HandshakeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Head of the Business"
            to="/hob"
            icon={<BusinessOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Notes"
            to="/notes"
            icon={<BusinessOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
          <MenuItem
            title="Logout"
            to="/logout"
            icon={<LogoutOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            closeDrawer={() => setIsModalOpen(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

const MenuItem = ({ title, to, icon, selected, setSelected, closeDrawer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isActive = selected === to;

  return (
    <Link
      to={to}
      style={{ textDecoration: "none", width: "100%" }}
      onClick={() => {
        setSelected(to);
        sessionStorage.setItem("selectedSidebarItem", to);
        closeDrawer();
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          padding: "12px 16px",
          cursor: "pointer",
          borderRadius: 3,
          color: isActive ? "#fff" : colors.grey[100],
          backgroundColor: isActive ? colors.blueAccent[700] : "inherit",
          width: "100%",
          "&:hover": { backgroundColor: colors.grey[800] },
        }}
      >
        <Box sx={{ color: isActive ? "#fff" : "inherit" }}>{icon}</Box>
        <Typography sx={{ marginLeft: 2, color: "inherit", fontWeight: "bold", fontSize: "15px" }}>{title}</Typography>
      </Box>
    </Link>
  );
};

export default Topbar;