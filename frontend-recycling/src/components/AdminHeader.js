import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../css/Header.css";
import ContactUs from "../pages/Contactus";
import Event from "../pages/Event";
import BarChart from "../pages/BarChart";
import Stories from "../pages/Stories";

function AdminHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/home");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };
  const openExternalLink = (url) => {
    window.open(url, "_blank");
    handleMenuClose();
  };


  const renderMenuItems = () => (
    <List sx={{ width: 250 }}>
      <ListItem>
        <IconButton onClick={toggleDrawer(false)} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={handleOpenDialog}>
        <ListItemText primary="UserSupport" />
      </ListItem>
      {!isLoggedIn ? (
        <>
          <ListItem button onClick={() => navigate("/login")}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => navigate("/signin")}>
            <ListItemText primary="Sign Up" />
          </ListItem>
          <ListItem button onClick={() => navigate("/home")}>
        <ListItemText primary="Home" />
      </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem button onClick={handleMenuOpen}>
            <AccountCircle /> &nbsp; Profile Menu
          </ListItem>
        </>
      )}
      {isLoggedIn && (
        <>
          <Divider />
          <ListItem button>
            <ListItemText primary="NewsLetter" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Stories" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Ideas" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate("/home")}>
          <img
            className="logo"
            src="https://thumbs.dreamstime.com/b/plastic-recycling-logo-template-waste-icon-separate-258275432.jpg"
            alt="logo"
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
          Plastic Recycling
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit"  onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button color="inherit" onClick={()=>navigate("/queries")}>Queries</Button>
          {!isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/signin")}>Sign Up</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Box>
        {/* Hamburger Menu for Mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {renderMenuItems()}
          </Drawer>
        </Box>
      </Toolbar>
      <ContactUs open={openDialog} onClose={handleCloseDialog} />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => openExternalLink("https://www.prestonplastics.co.uk/news")}>NewsLetter</MenuItem>
        <MenuItem onClick={()=>navigate("/stories")}>Stories</MenuItem>
        <MenuItem onClick={()=>navigate("/chart")}>Reports</MenuItem>
        <MenuItem onClick={()=>navigate("/event")}>Events</MenuItem>
        <MenuItem onClick={()=>navigate("/ideas")}>Ideas</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default AdminHeader;
