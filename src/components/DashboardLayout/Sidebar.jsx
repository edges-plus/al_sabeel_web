import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as MuiIcons from "@mui/icons-material";
import { useLocation, NavLink } from "react-router-dom";
import routes from "@components/DashboardLayout/routes.json";
import { useSelector } from "react-redux";

const componentConstructor = (name) => {
  const IconComponent = MuiIcons[name];
  return IconComponent ? <IconComponent /> : null;
};

const Sidebar = ({ collapsed, onItemSelect }) => {
 let user = JSON.parse(localStorage.getItem("user"));
    const {  permissions } = useSelector((state) => state.auth);



  const userPermissions =permissions || [];

  const hasPermission = (perm) => userPermissions.includes(perm);
  const hasAnyPermission = (perms = []) =>
    perms.some((p) => userPermissions.includes(p));

  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const currentPaths = [
    location.pathname,
    location.pathname.split("/").slice(0, 3).join("/"),
  ];

  const toggleSubMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  React.useEffect(() => {
    if (collapsed) {
      setOpenMenus({});
    }
  }, [collapsed]);

  const renderMenuItems = () =>
    routes?.data.map((route, i) => {
      const key = route.key || `route-${i}`;
      const hasSub = route?.sub?.length;
      const isOpen = openMenus[key] ?? false;
      const icon = componentConstructor(route.icon);

      if (hasSub) {
        const filteredSubs = route.sub.filter(
          (sub) => !sub.permissions || hasAnyPermission(sub.permissions)
        );

        if (!filteredSubs.length) return null; 

        return (
          <Box key={key}>
            <Tooltip title={collapsed ? route.key : ""} placement="right">
              <ListItemButton onClick={() => toggleSubMenu(key)}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                {!collapsed && (
                  <>
                    <ListItemText primary={route.key} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>
            </Tooltip>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {!collapsed &&
                  filteredSubs.map((sub) => {
                    const subIcon = componentConstructor(sub.icon);
                    return (
                      <Tooltip
                        title={collapsed ? sub.key : ""}
                        placement="right"
                        key={sub.path}
                      >
                        <ListItemButton
                          component={NavLink}
                          to={sub.path}
                          selected={currentPaths.includes(sub.path)}
                          onClick={() => onItemSelect?.()}
                          sx={{ pl: 4 }}
                        >
                          {subIcon && <ListItemIcon>{subIcon}</ListItemIcon>}
                          {!collapsed && (
                            <ListItemText primary={sub.key} />
                          )}
                        </ListItemButton>
                      </Tooltip>
                    );
                  })}
              </List>
            </Collapse>
          </Box>
        );
      }

      return (
        <Tooltip
          key={route.path}
          title={collapsed ? route.key : ""}
          placement="right"
        >
          <ListItemButton
            component={NavLink}
            to={route.path}
            selected={currentPaths.includes(route.path)}
            onClick={() => onItemSelect?.()}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {!collapsed && <ListItemText primary={route.key} />}
          </ListItemButton>
        </Tooltip>
      );
    });

  return (
    <Box
      sx={{
        height: "calc(100vh - env(safe-area-inset-bottom) - 64px)",
        pt: "env(safe-area-inset-top)",
        px: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #059880, #202020)",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          color: '#fff',
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <List>{renderMenuItems()}</List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          pt: 1,
          width: "100%",
          mt: "1",
          position: "sticky",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "gray",
            mb: 1,
            display: "block",
            fontSize: collapsed ? "0.5rem" : "0.9rem",
            transition: "font-size 0.2s ease-out",
          }}
        >
          Powered by
        </Typography>
        <img
          src="/icons/edges_logo.png"
          alt="EdgesPlus Logo"
          style={{ height: collapsed ? "20px" : "40px" }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;

