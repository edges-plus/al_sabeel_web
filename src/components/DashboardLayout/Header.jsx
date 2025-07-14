import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { AccountCircle, } from '@mui/icons-material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { logout } from "@actions/authActions";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
function Header({ collapsed, toggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state.auth);
const hasPermission = (perm) => permissions?.includes(perm);

  const logoutClick = () => {
    dispatch(logout());
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    {
      key: '1',
      label: 'Profile',
      path: '/profile',
    },
    {
      key: '2',
      label: 'Settings',
      path: '/Settings',
    },
    {
      key: '3',
      label: 'Logout',
      onClick: logoutClick, // Assign the logout handler
    },
  ];


  const handleMenuItemClick = (item) => {
    handleMenuClose();

    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path); // Navigate to the specified path
    }
  };
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // px: 2, // left and right padding
      }}
    >
      {/* Hamburger menu icon for mobile view */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton onClick={toggle} sx={{ p: 0 }}>
          <MenuIcon sx={{ color: 'primary.main', p: 0, fontSize: "40px" }} />
        </IconButton>
      </Box>
      {/* Logo on the left - hidden on mobile */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <img
          src="/icons/AlSabeel_logo2.png" 
          alt="Logo"
          style={{ height: 50 }} // adjust as needed
        />
      </Box>
      {/* Branch name display */}
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* {hasPermission('app.reminders') && (
        <IconButton onClick={() => navigate('/reminder')}>
          <CircleNotificationsIcon sx={{ fontSize: 44 }} />
        </IconButton>
        )} */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{ style: { width: 200 } }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleMenuClose();
                if (item.onClick) {
                  item.onClick(); // For logout
                } else if (item.path) {
                  navigate(item.path); // For navigation items
                }
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>



  );
};

export default Header;

