import React, { useState } from "react";

export default function Form(props) {
  const [inputValue, setInputValue] = useState(
    props.inputField.reduce(
      (prevValue, value) => ({ ...prevValue, [value.name]: "" }),
      {},
    ),
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event) => {
    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form className="space-y-4 md:space-y-6" action="#">
            {props.inputField.length !== 0 &&
              props.inputField.map((item, index) => (
                <div key={index}>
                  <label
                    htmlFor={item.name}
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {item.label}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      onChange={handleInputChange}
                      type={
                        item.type === "password" && showPassword
                          ? "text"
                          : item.type
                      }
                      name={item.name}
                      id={item.name}
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      required
                      placeholder={item.placeholder}
                    />
                    {item.name === "password" && (
                      <div
                        type="button"
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                        }}
                      >
                        <img
                          onClick={handleTogglePassword}
                          style={{ width: "30px" }}
                          src={
                            showPassword
                              ? "https://icons.veryicon.com/png/o/miscellaneous/hekr/action-hide-password.png"
                              : "https://cdn-icons-png.flaticon.com/512/6803/6803345.png"
                          }
                          alt="show password"
                        />
                      </div>
                    )}
                  </div>
                  {props.errorMessages.length !== 0 &&
                    props.errorMessages.map((err, index) => (
                      <div key={index} style={{ color: "red" }}>
                        {err[item.name]}
                      </div>
                    ))}
                </div>
              ))}
            {props.notFoundPermissionsMessage !== "" &&
              props.errorMessages.length === 0 && (
                <div style={{ color: "red" }}>
                  {props.notFoundPermissionsMessage}
                </div>
              )}
            <div className="flex justify-center select-none">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  props.submit(inputValue);
                }}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                {props.buttonText}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p
                className="text-blue-500 underline cursor-pointer"
                onClick={() => props.toggleTextFunction()}
              >
                {props.toggleText}
              </p>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
