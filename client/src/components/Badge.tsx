import React from "react";
import { Box } from "@mui/material";

interface BadgeProps {
  content: string;
}

const Badge: React.FC<BadgeProps> = ({ content }) => (
  <Box
    sx={{
      background: "crimson",
      borderRadius: "10px",
      color: "white",
      height: "20px",
      padding: "0 5px",
      fontSize: "10px",
      display: "flex",
      alignItems: "center",
    }}
  >
    {content}
  </Box>
);

export default Badge;
