import React, { useEffect, useState } from "react";
import PopUpModal from "./PopUpModle";
import { Button, TextField } from "@mui/material";
import MultiSelect from "./MultiSelect";

export default function PopUp({
  errorMessages,
  selectedUser,
  ispopUpOpen,
  changePopUpValue,
  buttonFunction,
  buttonText,
  chips,
  checkboxOptions,
}) {
  useEffect(() => {
    if (selectedUser !== undefined && Object.keys(selectedUser).length !== 0) {
      setFields((prevFields) => ({
        ...prevFields,
        id: selectedUser.id,
        name: selectedUser.name,
      }));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!ispopUpOpen) {
      setFields({
        id: "",
        name: "",
        password: "",
        permissions: [],
      });
    }
  }, [ispopUpOpen]);

  const [fields, setFields] = useState({
    id: "",
    name: "",
    password: "",
    permissions: [],
  });

  function getInput(value, fieldName) {
    setFields((prevFields) => {
      return {
        ...prevFields,
        [fieldName]: value,
      };
    });
  }

  function addPermission(permissions) {
    setFields((prevFields) => {
      return {
        ...prevFields,
        permissions: permissions,
      };
    });
  }

  const renderTextField = (key) => {
    if (key === "permissions") {
      return (
        <MultiSelect
          style={{ padding: "1em" }}
          key={key}
          getSelectOptions={(v) => {
            addPermission(v);
          }}
          chips={chips}
          defaultValue={"Choose Permissions"}
          width={"237px"}
          options={checkboxOptions}
        />
      );
    }
    if (key !== "id" && key !== "permissions") {
      return (
        <div key={key}>
          <TextField
            error={
              errorMessages.length > 0
                ? errorMessages.some((item) => Object.keys(item).includes(key))
                : false
            }
            key={key}
            onChange={(event) => getInput(event.target.value, key)}
            fullWidth
            label={key}
            id={key}
            helperText={
              errorMessages.length > 0 &&
              errorMessages
                .filter((item) => Object.keys(item).includes(key))
                .map((item) => item[key])
            }
            defaultValue={selectedUser[key]}
          />
        </div>
      );
    }
  };

  function getData() {
    buttonFunction(fields);
  }

  return (
    selectedUser !== undefined && (
      <PopUpModal
        handleOpen={ispopUpOpen}
        handleClose={(event) => changePopUpValue(event, {})}
      >
        <div className="flex-col">
          {Object.keys(fields).map((key) => (
            <div key={key}>{renderTextField(key, fields[key])}</div>
          ))}
          {errorMessages.length !== 0 &&
            errorMessages[0].general !== undefined && (
              <div>
                <div className="error-message">{errorMessages[0].general}</div>
              </div>
            )}
          <Button onClick={getData} variant="outlined">
            {buttonText ? buttonText : "submit"}
          </Button>
        </div>
      </PopUpModal>
    )
  );
}
