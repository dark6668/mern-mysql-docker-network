import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function AccountMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuTimer;

  function handleMouseEnter() {
    clearTimeout(menuTimer);
    setIsMenuOpen(true);
  }

  function handleMouseLeave() {
    menuTimer = setTimeout(() => setIsMenuOpen(false), 100);
  }

  function handleMenuMouseEnter() {
    clearTimeout(menuTimer);
  }

  function handleMenuMouseLeave() {
    menuTimer = setTimeout(() => setIsMenuOpen(false), 100);
  }

  function logOut() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.reload();
  }

  return (
    <div className="menu-container" onMouseLeave={handleMouseLeave}>
      <Avatar
        className="avatar"
        onMouseEnter={handleMouseEnter}
        sx={{ bgcolor: deepOrange[500] }}
      >
        {user.name[0].toUpperCase()}
      </Avatar>
      {isMenuOpen && (
        <div
          className="menu"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      )}
    </div>
  );
}
