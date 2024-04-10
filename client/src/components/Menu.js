import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function AccountMenu({ user, changeMenuVisibility }) {
  return (
    <div className="avatar-contianer">
      <Avatar
        className="avatar"
        onClick={changeMenuVisibility}
        sx={{ bgcolor: deepOrange[500] }}
      >
        {user.name[0].toUpperCase()}
      </Avatar>
    </div>
  );
}
