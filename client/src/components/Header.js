import React, { useState } from "react";

import AccountMenu from "./Menu";
import LeftMenu from "./LeftMenu";
export default function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function changeMenuVisibility() {
    setIsMenuOpen((prev) => !prev);
  }
  return (
    <div className="header-container">
      <AccountMenu changeMenuVisibility={changeMenuVisibility} user={user} />

      <LeftMenu
        open={isMenuOpen}
        changeMenuVisibility={changeMenuVisibility}
        user={user}
      />
    </div>
  );
}
