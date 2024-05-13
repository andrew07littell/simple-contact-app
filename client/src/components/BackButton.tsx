import React from "react";

import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const BackButton: React.FC = () => (
  <NavLink to={"/"}>
    <IconButton edge="start" aria-label="menu" sx={{ mr: 2, color: "white" }}>
      <ArrowBack />
    </IconButton>
  </NavLink>
);

export default BackButton;
