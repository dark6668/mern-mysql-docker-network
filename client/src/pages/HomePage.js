import React from "react";
import AdminPage from "./Admin/AdminPage";
export default function HomePage(props) {
  return (
    <div>
      {props.user !== undefined &&
      props.user.permissions.includes("view_users") ? (
        <AdminPage user={props.user} />
      ) : (
        <div className="text-center">No user available.</div>
      )}
    </div>
  );
}
