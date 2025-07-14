// src/navigation/router.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@navigation/PrivateRoute";
import NotFound from "@pages/404";
import { routes } from "@navigation/routes.jsx";
// import { AnimatePresence } from "framer-motion";
const Router = () => {
  return (
    // <AnimatePresence mode="wait">
    <Routes>
      {routes.map((route, idx) => {
        const Component = route.component;
        return (
        
          <Route
            key={idx}
            path={route.path}
            element={
              route.private ? (
                <PrivateRoute>
                  <Component />
                 </PrivateRoute>
              ) : (
                <Component />
              )
            }
          />
     
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </AnimatePresence>
  );
};

export default Router;

