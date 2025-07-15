import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";

const managementOptions = [
  {
    name: "CRM",
    description: "Manage customer relationships and leads",
    icon: <ContactPhoneIcon />,
  },
  {
    name: "Service Management",
    description: "Track jobs, assign technicians, and monitor progress",
    icon: <BuildCircleIcon />,
  },
  {
    name: "Site Management",
    description: "Oversee site activities and staff performance",
    icon: <ApartmentIcon />,
  },
];

const ManagementSections = () => (
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
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
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
            </ListItem>
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

export default ManagementSections;
