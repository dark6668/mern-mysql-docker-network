import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Groups3Icon from "@mui/icons-material/Groups3";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export default function LeftMenu({ user, open, changeMenuVisibility }) {
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);

  function logOut() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.reload();
  }

  function OpenNewGroup() {
    setIsNewGroupOpen((prev) => !prev);
  }

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={changeMenuVisibility}>
        <div className="avatar-contianer"></div>
        <div className="left-menu-container">
          <div className="menu">
            <MenuItem onClick={logOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
            <Link to={"/"}>
              <MenuItem>
                <ListItemIcon>
                  <Groups3Icon fontSize="small" />
                </ListItemIcon>
                my Groups
              </MenuItem>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
