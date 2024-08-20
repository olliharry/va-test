import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CompTableProps {
  rowNum: number | null;
}
function createData(name: string, xRay: string, comp: string) {
  return { name, xRay, comp };
}
const rows = [
  createData("Price", "£10000", "£8500"),
  createData("Weight", "400KG", "600KG"),
];

const rows1 = [
  createData("RPM", "400", "300"),
  createData("Power Consumption", "20W", "25W"),
];

const rows2 = [
  createData("Screen Size", "21 Inch", "18 Inch"),
  createData("Resolution", "4K", "2K"),
];
const rows3 = [
  createData("Thickness", "1 Inch", "0.5 Inch"),
  createData("Shatters", "No", "Yes"),
];
const rows4 = [
  createData("material", "Kevlar", "Cotten"),
  createData("Durability", "Strong", "Weak"),
];
const rows5 = [
  createData("Max Temp", "45 Degrees", "60 Degrees"),
  createData("Vent Size", "10 Cm", "7 Cm"),
];
const rows6 = [
  createData("material", "Kevlar", "Cotten"),
  createData("Durability", "Strong", "Weak"),
];

const CompTable: React.FC<CompTableProps> = ({ rowNum }) => {
  const allRows = [rows, rows1, rows2, rows3, rows4, rows5, rows6];
  if (rowNum == -1 || rowNum == null) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-bold" align="center">
              Field
            </TableCell>
            <TableCell className="font-bold" align="center">
              X-Ray V1&nbsp;
            </TableCell>
            <TableCell className="font-bold" align="center">
              Competitor&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRows[rowNum].map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.xRay}</TableCell>
              <TableCell align="center">{row.comp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompTable;
