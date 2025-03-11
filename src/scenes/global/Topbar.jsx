import { Box, IconButton, useTheme, Typography, useMediaQuery, Modal } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import { Tooltip } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"; // For "Customer Manager"
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined"; // For "Customer Relationship Manager"
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"; // For "Head of the Business"
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoLight from "./logo.png";
import logoDark from "./logo2.png";
import { useNavigate } from "react-router-dom";

const MenuItemComponent = ({ title, to, icon, selected, setSelected, closeDrawer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isActive = selected === to; // Check if the item is active

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        padding: "12px 16px",
        cursor: "pointer",
        color: isActive ? "#fff" : colors.grey[100], // White color for active item
        backgroundColor: isActive ? colors.blueAccent[700] : "inherit",
        "&:hover": { backgroundColor: colors.grey[800] },
      }}
      onClick={() => {
        setSelected(to);
        localStorage.setItem("selectedSidebarItem", to);
        closeDrawer(); // Close modal on selection
      }}
    >
      <Box sx={{ color: isActive ? "#fff" : "inherit" }}> {/* Ensures icon color changes */}
        {icon}
      </Box>
      <Typography sx={{ marginLeft: 2 }}>
        <Link to={to} style={{ textDecoration: "none", color: isActive ? "#fff" : "inherit" }}>{title}</Link>
      </Typography>
    </Box>
  );
};


const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItem = localStorage.getItem("selectedSidebarItem");
    if (storedItem) {
      setSelected(storedItem);
    }
  }, [location.pathname]); // Sync when URL changes

  const logoSrc = theme.palette.mode === "dark" ? logoDark : logoLight;

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center" backgroundColor={colors.primary[400]} sx={{ marginLeft: "20px" }}>
      {isMobile ? (
        <Box sx={{ width: "150px", height: "50px" }}>
          <img src={logoSrc} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Box>
      ) : (
        <Box backgroundColor={colors.primary[400]} borderRadius="3px">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" type="hidden" />
        </Box>
      )}

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon onClick = {() => navigate('profile')} />
        </IconButton>
        {isMobile && (
          <IconButton onClick={() => setIsModalOpen(true)}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box width="250px" sx={{ background: colors.primary[400], height: "100vh", position: "absolute", left: 0, top: 0, padding: "20px" }}>
          <MenuItemComponent title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
          <MenuItemComponent title="Customer Manager" to="/cm" icon={<PeopleAltOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
          <MenuItemComponent   title={ <Typography>  Customer Relationship <br /> Manager </Typography>} to="/crm" icon={<HandshakeOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
          <MenuItemComponent title="Head of the Business" to="/hob" icon={<BusinessOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
          <MenuItemComponent title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
          <MenuItemComponent title="Logout" to="/logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} closeDrawer={() => setIsModalOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Topbar;
