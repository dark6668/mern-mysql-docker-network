import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

export default function Form({
  errorMessages,
  inputField,
  buttonText,
  toggleTextFunction,
  toggleText,
  submit,
}) {
  const [inputValue, setInputValue] = useState(
    inputField.reduce(
      (prevValue, value) => ({ ...prevValue, [value.name]: "" }),
      {},
    ),
  );
  const [showPassword, setShowPassword] = useState(false);

  function handleInputChange(value, fieldName) {
    setInputValue((prevFields) => {
      return {
        ...prevFields,
        [fieldName]: value,
      };
    });
  }

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className="flex-center">
      <form className="form">
        {Object.keys(inputValue).map((value, index) => (
          <TextField
            key={index}
            style={{ width: "100%" }}
            type={value === "password" && !showPassword ? "password" : "text"}
            onChange={(event) => handleInputChange(event.target.value, value)}
            autoComplete="true"
            label={value}
            variant="outlined"
            error={
              errorMessages.length > 0
                ? errorMessages.some((item) =>
                    Object.keys(item).includes(value),
                  )
                : false
            }
            helperText={
              errorMessages.length > 0 &&
              errorMessages
                .filter((item) => Object.keys(item).includes(value))
                .map((item) => item[value])
            }
            InputProps={
              value === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        ))}
        {errorMessages.length > 0 && "general" in errorMessages[0] && (
          <div className="error-message">{errorMessages[0].general}</div>
        )}
        <Button
          onClick={(event) => {
            event.preventDefault();
            submit(inputValue);
          }}
          variant="contained"
        >
          {buttonText}
        </Button>
        <div className="flex items-center justify-center">
          <p
            className="text-blue-500 underline cursor-pointer"
            onClick={() => toggleTextFunction()}
          >
            {toggleText}
          </p>
        </div>
      </form>
    </div>
  );
}
