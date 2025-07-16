import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useNavigate } from "react-router-dom";

const ManagementSections = () => {
  const navigate = useNavigate();

  const managementOptions = [
    {
      name: "CRM",
      description: "Manage customer relationships and leads",
      icon: <ContactPhoneIcon />,
      onClick: () => navigate("/crm"),
    },
    {
      name: "Service Management",
      description: "Track jobs, assign technicians, and monitor progress",
      icon: <BuildCircleIcon />,
      onClick: () => navigate("/management/service"),
    },
    {
      name: "Site Management",
      description: "Oversee site activities and staff performance",
      icon: <ApartmentIcon />,
      onClick: () => navigate("/management/site"),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Quick Access
      </Typography>
      <Box sx={{ flex: 1 }}>
        <List disablePadding>
          {managementOptions.map((section, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                alignItems="flex-start"
                sx={{ px: 0 }}
                onClick={section.onClick}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.dark",
                      width: 44,
                      height: 44,
                    }}
                  >
                    {section.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {section.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {section.description}
                    </Typography>
                  }
                />
              </ListItemButton>
              {index < managementOptions.length - 1 && (
                <Divider
                  component="li"
                  sx={{ my: 1, ml: 7, borderColor: "grey.200" }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ManagementSections;
