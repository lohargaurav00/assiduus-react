import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  useAccountTableData,
  AccountTableDataI,
} from "@/hooks/useAccountTableData";
import useMonthStore from "@/hooks/useMonthStore";

const AccountTable: FC = () => {
  const { month } = useMonthStore();
  const rowsData: AccountTableDataI = useAccountTableData(month);
  return (
    <TableContainer
      sx={{
        minWidth: 650,
      }}
    >
      <Table
        aria-label="simple table"
        sx={{
          "& .MuiTableCell-root": {
            padding: "8px",
            border: 0,
            fontWeight: 700,
            textTransform: "capitalize",
          },
        }}
      >
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              color: "var(--text-tertiary)",
            },
          }}
        >
          <TableRow>
            <TableCell align="left" width={"60%"}>
              Account
            </TableCell>
            <TableCell align="left">This Month</TableCell>
            <TableCell align="left">YTD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              color: "var(--text-secondary)",
            },
          }}
        >
          {rowsData.map((row) => (
            <TableRow key={row.account}>
              <TableCell>{row.account}</TableCell>
              <TableCell align="left">{row.thisMonth}</TableCell>
              <TableCell align="left">{row.ytd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
