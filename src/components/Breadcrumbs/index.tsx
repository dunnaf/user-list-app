import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import LinkHref from "next/link";
import { Props } from "./types";

const BreadcrumbsComponent: React.FC<Props> = ({ links }) => {
  return (
    <>
      <Box sx={{ margin: "20px 0px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          {links.map((el, i) =>
            el.active ? (
              <Typography key={i} className="h-400-15 c-000000">
                {el.title}
              </Typography>
            ) : (
              <LinkHref key={i} href={el.href} passHref>
                <Link
                  className="h-200-15 c-000000"
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                >
                  {el.title}
                </Link>
              </LinkHref>
            )
          )}
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default BreadcrumbsComponent;
