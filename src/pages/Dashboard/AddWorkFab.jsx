import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";

function AddWorkFab({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
    >
      {/* Apple-style animated label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            style={{
              position: "absolute",
              right: 70,
              bottom: "50%",
              transform: "translateY(50%)",
              background: "#1976d2", // MUI primary.main default
              color: "white",
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Add Work
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default AddWorkFab;
