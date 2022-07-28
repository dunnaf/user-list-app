import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { IUserTable } from "~/types";

interface Props {
  users: IUserTable[];
}

const DataTableComponent: React.FC<Props> = ({ users }) => {
  // Get Router
  const router: NextRouter = useRouter();
  const { results } = router.query;

  // Data Table Configuration
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "gender", headerName: "Gender", width: 200 },
    {
      field: "registerDate",
      type: "date",
      headerName: "Register Date",
      width: 200,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <DataGrid
          autoHeight
          columns={columns}
          hideFooter
          pageSize={Number(results)}
          rows={users}
        />
      </Box>
    </>
  );
};

export default DataTableComponent;
