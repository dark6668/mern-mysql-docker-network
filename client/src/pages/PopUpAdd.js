import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import Utility from "../function/utility";
export default function PopUpAdd({ user, getUsers }) {
  const [ispopUpOpen, setIspopUpOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [chips, setChips] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState([
    "edit_users",
    "delete_users",
    "view_users",
    "add_users",
  ]);

  useEffect(() => {
    if (!ispopUpOpen) {
      setErrMessage("");
    }
  }, [ispopUpOpen]);

  function changePopUpValue() {
    setIspopUpOpen((prev) => !prev);
  }

  function areInputNotEmpty(input) {
    let entries = Object.values(input);
    return entries
      .map((item) => {
        if (!Array.isArray(item)) {
          return item === "";
        }
      })
      .some((v) => v === true);
  }

  async function modifyUserData(newUser) {
    setErrMessage("");
    const { id, ...input } = newUser;

    const oneFieldIsEmpty = areInputNotEmpty(input);
    if (oneFieldIsEmpty) {
      setErrMessage("Please fill in all fields.");
      return;
    }
    let request = {
      method: "post",
      url: `api/users/addUser`,
      body: JSON.stringify({ newUser }),
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
    <div>
      <div className="button-popUp-add">
        <Button
          onClick={changePopUpValue}
          variant="contained"
          disabled={!user.permissions.includes("add_users")}
        >
          Add User
        </Button>
      </div>

      <PopUp
        checkboxOptions={checkboxOptions}
        chips={chips}
        ispopUpOpen={ispopUpOpen}
        changePopUpValue={changePopUpValue}
        buttonFunction={modifyUserData}
        buttonText="Add"
        errMessage={errMessage}
        selectedUser={{}}
      />
    </div>
  );
}
