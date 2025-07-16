import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const HeaderContainer = ({
  yScrol = {
    // overflowY: "auto",
    // height: {
    //   xs: '70vh', // Mobile devices
    //   sm: '80vh',  // Tablets
    //   md: '65vh',  // Desktops
    // },
  },
  // Search related props
  showSearch = false,
  searchValue = "",
  onSearchChange = () => {},
  onClearSearch = () => {},
  searchPlaceholder = "Search...",

  // Original props
  header,
  addButton = false,
  buttonFunction = () => {},
  buttonText = "Add",
  buttonIcon = true,
  divider = true,
  children,
  ...props
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 2,
          py: 1.5,
        }}
      >
        {/* Top row: Header and Add button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            color="brand.edgesBlack"
            sx={{
             minWidth: 'unset',
              flexShrink: 0
            }}
          >
            {header}
          </Typography>

          {addButton && (
            <Button
              variant="contained"
              color="primary"
              onClick={buttonFunction}
              startIcon={buttonIcon ? <AddIcon /> : null}
            >
              {buttonText}
            </Button>
          )}
        </Box>

        {/* Search area */}
        {showSearch && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", md: "350px" },
              }}
            />
            {searchValue && (
              <Button variant="outlined" onClick={onClearSearch} size="small">
                Clear
              </Button>
            )}
          </Box>
        )}
      </Box>

      {divider && <Divider className="divider-style" sx={{ mb: 2 }} />}

      <Box className="container-body" sx={{}}>
        
        {children}
      </Box>
    </>
  );
};

export default HeaderContainer;

