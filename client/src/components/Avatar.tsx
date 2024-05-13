import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";

interface AvatarProps {
  contact: { firstName: string; lastName: string };
}

const Avatar: React.FC<AvatarProps> = ({ contact }) => {
  return (
    <MuiAvatar>
      {contact.firstName[0]}
      {contact.lastName[0]}
    </MuiAvatar>
  );
};

export default Avatar;
