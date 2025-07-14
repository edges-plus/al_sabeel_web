import React, { useState, useEffect, createContext } from "react";
import {
  AppBar,
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Drawer,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Loader from "@components/loader/loader";
import Sidebar from "@components/DashboardLayout/Sidebar";
import Header from "@components/DashboardLayout/Header";
import Footer from "@components/DashboardLayout/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export const hightContext = createContext("0px");
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { loaderStatus } = useSelector((state) => state.loaderReducer);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [heightValue, setHeightValue] = useState("0px");

  useEffect(() => {
    const checkIsMobileLandscape = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const isLandscape = width > height && height < 600;
      setIsMobileLandscape(isLandscape);
      setHeightValue(isLandscape ? "150px" : "0px");
    };

    checkIsMobileLandscape();
    window.addEventListener("resize", checkIsMobileLandscape);
    return () => window.removeEventListener("resize", checkIsMobileLandscape);
  }, []);

  const generateBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean).slice(0, 3);
    return pathParts.map((item, index) => {
      const formatted = item.replace(/([A-Z])/g, " $1");
      const toPath = "/" + pathParts.slice(0, index + 1).join("/");
      return (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          sx={{ textTransform: "capitalize", cursor: "pointer" }}
          onClick={() => navigate(toPath)}
        >
          {formatted}
        </Link>
      );
    });
  };

  const drawerVariant = isMobile ? "temporary" : "persistent";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <CssBaseline />

      {/* Header */}
      <AppBar
        position={isMobile ? "static" : "fixed"} // ⬅ dynamic position
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "text.primary",
        }}
      >
        <Toolbar>
          <Header collapsed={collapsed} toggle={toggle} />
        </Toolbar>
      </AppBar>

      {/* Main area */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Drawer */}
        <Box
          sx={{
            display: {
              xs: !collapsed ? "flex" : "none", // mobile
              sm: "flex", // tablet & up
            },
          }}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <Drawer
            variant={drawerVariant}
            anchor="left"
            open={!isMobile || !collapsed}
            onClose={toggle}
            sx={{
              width: collapsed ? 80 : 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: collapsed ? 80 : 240,
                boxSizing: "border-box",
                position: isMobile ? "relative" : "fixed", // ⬅ matches AppBar
                top: isMobile ? "auto" : "64px",           // ⬅ offset for AppBar only on desktop
                height: isMobile ? "auto" : "calc(100vh - 64px)",
              },
            }}
          >
            <Sidebar collapsed={collapsed} onItemSelect={isMobile ? toggle : undefined} />
          </Drawer>

        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: isMobile ? 0 : "64px", // ⬅ only apply padding when AppBar is fixed
          }}
        >
          <Container
            sx={{

              padding: isMobileLandscape ? 0 : 1,
              flexGrow: 2,

              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            {!isMobileLandscape && (
              <Breadcrumbs
                aria-label="breadcrumb"

                sx={{
                  margin: '8px 0', color: 'primary.main',
                  paddingLeft: 3,
                }}

              >
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate("/dashboard")}
                  sx={{ cursor: "pointer" }}
                >
                  Home
                </Link>
                {generateBreadcrumbs()}
              </Breadcrumbs>
            )}

            <hightContext.Provider value={heightValue}>
              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: "background.default",
                  padding: 2,
                  boxShadow: 6,
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                {loaderStatus && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.6)",
                      zIndex: 10,
                      borderRadius: 2,
                    }}
                  >
                    <Loader />
                  </Box>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ height: "100%" }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </hightContext.Provider>
          </Container>
          {!isMobileLandscape && <Footer />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

