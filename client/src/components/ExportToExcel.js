import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";

export default function ExportToExcel({ rows }) {
  const exportToExcel = () => {
    const rowsWithFlattenedPermissions = rows.map((row, index) => ({
      ...row,
      id: index + 1,
      permissions:
        row.permissions.length === 0 ? 0 : row.permissions.join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rowsWithFlattenedPermissions);

    const columns = Object.keys(rowsWithFlattenedPermissions[0]);
    const columnWidths = columns.map((column) => {
      const keyWidth = column.length;
      const contentWidth = Math.max(
        ...rowsWithFlattenedPermissions.map(
          (row) => (row[column] || "").toString().length,
        ),
      );
      return { wch: Math.max(keyWidth, contentWidth) };
    });
    worksheet["!cols"] = columnWidths;

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: R };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        if (!worksheet[cellRef]) continue;
        worksheet[cellRef].s = {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "ListOfUsers.xlsx");
  };

  return (
    <IconButton onClick={exportToExcel} aria-label="export to excel">
      <GetAppIcon />
    </IconButton>
  );
}
