import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import Utility from "../function/utility";
export default function PopUpAdd({ user, getUsers }) {
  const [ispopUpOpen, setIspopUpOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState([
    "edit_users",
    "delete_users",
    "view_users",
    "add_users",
  ]);

  useEffect(() => {
    if (!ispopUpOpen) {
      setErrorMessages([]);
    }
  }, [ispopUpOpen]);

  function changePopUpValue() {
    setIspopUpOpen((prev) => !prev);
  }

  async function modifyUserData(newUser) {
    setErrorMessages([]);
    const { id, permissions, ...values } = newUser;
    Utility.validInput(values)
      .then(async () => {
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
      })
      .catch((errors) => {
        setErrorMessages(errors);
      });
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
        errorMessages={errorMessages}
        selectedUser={{}}
      />
    </div>
  );
}
