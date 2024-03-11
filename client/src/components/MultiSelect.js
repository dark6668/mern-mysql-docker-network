import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";

export default function MultiSelect({
  defaultValue,
  options,
  width,
  getSelectOptions,
  chips,
}) {
  const [selectOptions, setSelectOptions] = useState([]);
  const [dropDownOpen, setDropDown] = useState(false);
  useEffect(() => {
    getSelectOptions(selectOptions);
  }, [selectOptions]);

  useEffect(() => {
    setSelectOptions(chips.flat());
  }, [chips]);

  function handleDeleteChip(chip) {
    const updatedOptions = selectOptions.filter(
      (option) => ![].concat(chip).includes(option),
    );
    setSelectOptions(updatedOptions);
  }

  function changeDropDownOpenValue() {
    setDropDown((prev) => !prev);
  }

  function handleSelectChange(checked, select) {
    if (!checked) {
      handleDeleteChip(select);
      return;
    }
    setSelectOptions((prevOptions) => [...prevOptions, select]);
  }

  function handleSelectAll(checked) {
    if (!checked) {
      handleDeleteChip(options);
      return;
    }
    setSelectOptions(options);
  }

  return (
    <div className="multiSelect" style={width ? { width: width } : {}}>
      <div className="value">
        <div className="chip">
          {selectOptions.length > 0 ? (
            selectOptions.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                onDelete={() => {
                  handleDeleteChip(chip);
                }}
              />
            ))
          ) : (
            <div>{defaultValue}</div>
          )}
        </div>
        <ArrowDropDownIcon
          className="icon-drop-down"
          style={dropDownOpen ? { transform: "rotate(180deg)" } : {}}
          onClick={changeDropDownOpenValue}
        />{" "}
      </div>
      {dropDownOpen && (
        <div className="drop-down">
          <div className="checkbox">
            <Checkbox
              checked={selectOptions.length === options.length}
              onChange={(event) => {
                handleSelectAll(event.target.checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div>Select All</div>
          </div>

          {options.length !== 0 &&
            options.map((option, index) => (
              <div key={index} className="checkbox">
                <Checkbox
                  checked={selectOptions.includes(option)}
                  onChange={(event) => {
                    handleSelectChange(event.target.checked, option);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div>{option}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
