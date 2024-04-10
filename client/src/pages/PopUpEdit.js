import React, { useEffect, useState } from "react";
import Utility from "../function/utility";
import PopUp from "../components/PopUp";
export default function PopUpEdit({
  ispopUpOpen,
  changePopUpValue,
  selectedUser,
  getUsers,
}) {
  useEffect(() => {
    if (
      selectedUser?.permissions !== undefined &&
      selectedUser.permissions.length > 0
    ) {
      setChips(selectedUser.permissions.split(","));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!ispopUpOpen) {
      setErrorMessages("");
    }
  }, [ispopUpOpen]);

  const [errorMessages, setErrorMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState([
    "edit_users",
    "delete_users",
    "view_users",
    "add_users",
  ]);

  function areUsersEqual(user1, user2) {
    user2.permissions =
      user2.permissions === "No value here" ? "" : user2.permissions.toString();
    user1.permissions =
      user1.permissions === "No value here" ? "" : user1.permissions.toString();
    const changedValues = {};
    for (let key in user1) {
      if (key !== "id" && user1[key] !== user2[key]) {
        changedValues[key] = user1[key];
      }
    }
    return changedValues;
  }

  async function modifyUserData(updateUser) {
    setErrorMessages([]);
    const changedInput = areUsersEqual(updateUser, selectedUser);

    if (Object.keys(changedInput).length === 0) {
      setErrorMessages([{ general: "Please change at least one field." }]);
      return;
    }

    const result = {};
    for (let key in changedInput) {
      if (key !== "permissions") {
        result[key] = changedInput[key];
      }
    }

    if (Object.keys(result).length > 0) {
      try {
        await Utility.validInput(result);
      } catch (errors) {
        setErrorMessages(errors);
        return;
      }
    }

    return;
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
      changePopUpValue();
      getUsers();
    } catch (error) {
      if (
        error === "Failed to decode access token" ||
        error === "Unauthorized"
      ) {
        Utility.UserUnauthorized();
        return;
      }

      setErrorMessages([
        { general: "Something went wrong. Please try again later." },
      ]);
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
      errorMessages={errorMessages}
    />
  );
}
