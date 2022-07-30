import { Box, Pagination } from "@mui/material";
import React from "react";
import { Props } from "./types";

const PaginationComponent: React.FC<Props> = ({ params, handleChange }) => {
  // Get Url Params
  const { page, pageSize } = params;

  return (
    <>
      <Box>
        <Pagination
          count={pageSize}
          page={page}
          onChange={(_, page) => handleChange(page)}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Box>
    </>
  );
};

export default PaginationComponent;
