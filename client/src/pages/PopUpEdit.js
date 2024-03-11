import React, { useEffect, useState } from "react";
import Utility from "../function/utility";
import PopUp from "../components/PopUp";
import { keys } from "@mui/system";
export default function PopUpEdit({
  ispopUpOpen,
  changePopUpValue,
  selectedUser,
  getUsers,
}) {
  useEffect(() => {
    if (selectedUser !== undefined) {
      setChips([selectedUser.permissions]);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!ispopUpOpen) {
      setErrMessage("");
    }
  }, [ispopUpOpen]);

  const [errMessage, setErrMessage] = useState("");
  const [chips, setChips] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState([
    "edit_users",
    "delete_users",
    "view_users",
    "add_users",
  ]);
  function areUsersEqual(user1, user2) {
    for (const key in user2) {
      if (Array.isArray(user2[key])) {
        const userArray1 = user1[key].slice().sort().toString();
        const userArray2 = user2[key].slice().sort().toString();
        if (userArray1 !== userArray2) return false;
      } else {
        if (user1[key] !== user2[key]) return false;
      }
    }
    return true;
  }

  async function modifyUserData(updateUser) {
    setErrMessage("");
    const allEqual = areUsersEqual(updateUser, selectedUser);
    if (allEqual && updateUser.password === "") {
      setErrMessage("Please change at least one field.");
      return;
    }
    let request = {
      method: "PUT",
      url: `api/users/editUser`,
      body: JSON.stringify({ updateUser }),
      ContentType: "application/json; charset=UTF-8",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    try {
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      await Utility.FetchRequest(request);
      getUsers();
      changePopUpValue();
    } catch (err) {
      Utility.UserUnauthorized();
    }
  }

  return (
    <PopUp
      checkboxOptions={checkboxOptions}
      chips={chips}
      selectedUser={selectedUser}
      ispopUpOpen={ispopUpOpen}
      changePopUpValue={changePopUpValue}
      buttonFunction={modifyUserData}
      buttonText="Update"
      errMessage={errMessage}
    />
  );
}
