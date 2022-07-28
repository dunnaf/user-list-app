import { Box, Pagination } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { Props } from "./types";

const PaginationComponent: React.FC<Props> = ({ handleChange }) => {
  // Get Router
  const router: NextRouter = useRouter();
  const { page, pageSize } = router.query;

  return (
    <>
      <Box>
        <Pagination
          count={Number(pageSize)}
          page={Number(page)}
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
