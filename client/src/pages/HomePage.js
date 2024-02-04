import React, { useEffect } from "react";

export default function HomePage(props) {
  console.log(props.user);

  return (
    <div className="container mx-auto mt-8">
      {props.user !== undefined &&
      props.user.permissions.includes("edit_users") ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 py-2 px-4">User ID</th>
              <th className="border border-gray-300 py-2 px-4">User Name</th>
              <th className="border border-gray-300 py-2 px-4">Permissions</th>
              <th className="border border-gray-300 py-2 px-4">AccessToken</th>
              <th className="border border-gray-300 py-2 px-4">RefreshToken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 py-2 px-4">
                {props.user.id}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {props.user.name}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {props.user.permissions.map((permission, index) => (
                  <div key={index}>{permission}</div>
                ))}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {props.user.accessToken}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {props.user.refreshToken}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="text-center">No user available.</div>
      )}
    </div>
  );
}
