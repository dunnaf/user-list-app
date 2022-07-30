import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSortDirection,
  GridSortItem,
  GridSortModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Props } from "./types";

const DataTableComponent: React.FC<Props> = ({ params, users, handleSort }) => {
  // Get URL Params
  const { results, sortBy, sortOrder } = params;

  // Sort Model State
  const [sortModel, setSortModel] = useState<GridSortItem[]>([]);

  useEffect(() => {
    // Set Model
    const modelTemp: GridSortItem[] = [];

    // Check Query
    if (sortBy && sortOrder) {
      const field: string = String(sortBy);
      const sort: GridSortDirection = String(sortOrder) as GridSortDirection;
      modelTemp.push({ field, sort });
    }

    // Set Sort Model
    setSortModel(modelTemp);
  }, [sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle Sort
  const onSort = (model: GridSortModel) => {
    if (model.length > 0) {
      const sortBy: string = model[0].field;
      const sortOrder: GridSortDirection = model[0].sort;

      // Set Sort Model
      setSortModel([model[0]]);

      // Handle Sort from Props
      handleSort(sortBy, sortOrder);
    }
  };

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
          pageSize={results}
          rows={users}
          sortModel={sortModel}
          onSortModelChange={onSort}
        />
      </Box>
    </>
  );
};

export default DataTableComponent;
