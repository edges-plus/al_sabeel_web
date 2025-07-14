import React, { useEffect,  } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "@navigation/router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import store from "@root/store.jsx";
import "@root/helpers/prototypes";
const theme = createTheme({

  palette: {
    primary: {
      main:  "#000000", 
    },
    secondary: {
      main: "#D3D3D3", 
    },
    brand:{
      main:"#059880",
      light: "#56E5FF", // Light 
      edgesBlack:"#202020",
      electricBlue:"#56E5FF",
      neonBlue:"#04D9FF",
    },
    mUiColor:{
      red:'#f44336'
    },
    mode: "light", // Default mode is light
    background: {
      default: "#ffffff", // White background for light mode
      paper: "#f5f5f5", // Slightly off-white for paper components
    },
    text: {
      primary: "#000000", // Black text for light mode
      secondary: "#D3D3D3", // Slightly lighter text for secondary content
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#D3D3D3", // Set primary text color to white
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#D3D3D3", // Set default color to white
        },
      },
    },
  },
});
function App() {


  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
       <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </BrowserRouter>
      </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App
