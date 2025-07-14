// src/navigation/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Index from "@components/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithPermission} from "@root/redux/actions/authActions";
import { motion } from "framer-motion";
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};
const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
  const { isLoggedIn,user } = useSelector((state) => state.auth);
    useEffect(() => {

    
    if (user?.id) {
      dispatch(getUserWithPermission(user.id));
    }
  }, [isLoggedIn, user]);


  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: .4, ease: "easeInOut" }}
  > 
  <Index>{children}</Index>  
   </motion.div>;
};

export default PrivateRoute;
