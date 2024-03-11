import React, { useState } from "react";

import AccountMenu from "./Menu";
export default function Header({ user }) {
  return (
    <div className="header-container">
      <AccountMenu user={user} />
    </div>
  );
}
