import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ExportToExcel from "./ExportToExcel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function NewTable({
  column,
  rows,
  deleteFunction,
  editFunction,
  user,
}) {
  const [excelRows, setExcelRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    if (rows.length > 0) {
      setTableRows([
        ...rows.map((item) => ({
          ...item,
          permissions:
            item.permissions.length === 0
              ? "No permissions "
              : item.permissions.join(","),
        })),
      ]);
    }
  }, [rows]);

  function handleCheckboxClick(event, item) {
    if (!event.target.checked) {
      setExcelRows((prev) => prev.filter((row) => row.id !== item.id));
      return;
    }
    setExcelRows((prev) => [...prev, item]);
  }

  function handleSelectAll(event) {
    if (!event.target.checked) {
      setExcelRows([]);
      return;
    }
    setExcelRows(tableRows);
  }

  const renderCellContent = (row, column) => {
    const cellContent = row[column];
    if (column === "edit") {
      return (
        <IconButton
          onClick={(event) => {
            const rowformat = {
              ...row,
              permissions:
                row.permissions === "No permissions " ? [] : row.permissions,
              password: "",
            };
            editFunction(event, rowformat);
          }}
          disabled={!user.permissions.includes("edit_users")}
          aria-label="edit"
        >
          <EditIcon
            color={
              user.permissions.includes("edit_users") ? "primary" : "disabled"
            }
          />
        </IconButton>
      );
    } else if (column === "delete") {
      return (
        <IconButton
          onClick={() => {
            deleteFunction(row);
          }}
          disabled={!user.permissions.includes("delete_users")}
          aria-label="delete"
        >
          <DeleteIcon
            color={
              user.permissions.includes("delete_users") ? "error" : "disabled"
            }
          />
        </IconButton>
      );
    } else if (column === "id") {
      return (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={excelRows.some((item) => item.name === row.name)}
                onChange={(event) => handleCheckboxClick(event, row)}
              />
            }
            label={rows.findIndex((item) => item.id === row.id) + 1}
          />
        </div>
      );
    } else {
      if (column === "export") {
        return;
      }
      return cellContent !== undefined && cellContent !== ""
        ? cellContent
        : "No value here";
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          {column && (
            <TableHead>
              <TableRow>
                {column.map((col, index) => (
                  <TableCell
                    style={{
                      width: "0%",
                      fontWeight: "bolder",
                      userSelect: "none",
                    }}
                    key={index}
                  >
                    {col === "export" ? (
                      <ExportToExcel
                        rows={excelRows.length > 0 ? excelRows : tableRows}
                      />
                    ) : col === "id" ? (
                      <FormControlLabel
                        control={<Checkbox onChange={handleSelectAll} />}
                        label={col}
                      />
                    ) : (
                      col
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {tableRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {column &&
                  column.map((col, colIndex) => (
                    <TableCell
                      className="TableCell"
                      key={`${rowIndex}-${colIndex}`}
                      style={{ textAlign: "start" }}
                    >
                      {renderCellContent(row, col)}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
