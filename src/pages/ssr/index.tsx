import { Box, Container, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import BreadcrumbsComponent from "~/components/Breadcrumbs";
import SortFilterComponent from "~/components/SortFilter";
import DataTableComponent from "@comps/DataTable";
import Axios from "@plugs/axios";
import { IUserParams, IUsersResponses, IUserTable } from "~/types";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import PaginationComponent from "~/components/Pagination";
import { NextRouter, useRouter } from "next/router";
import Apis from "~/plugins/axios/apis";
import { GridSortDirection } from "@mui/x-data-grid";

interface Props {
  usersRes: IUsersResponses;
}

const SSRPage: NextPage<Props> = ({ usersRes }) => {
  // Get Router
  const router: NextRouter = useRouter();
  const { page, pageSize, results, keyword, gender, sortBy, sortOrder } =
    router.query;

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  // URL Params State
  const [params, setParams] = useState<IUserParams>({
    page: Number(page),
    pageSize: Number(pageSize),
    results: Number(results),
    ...(keyword && { keyword: String(keyword) }),
    ...(gender && { gender: String(gender) }),
    ...(sortBy && { sortBy: String(sortBy) }),
    ...(sortOrder && { sortOrder: String(sortOrder) }),
  });

  // Users Data Table State
  const [usersTable, setUsersTable] = useState<IUserTable[]>([]);

  // Get URL Params and Data Users for Data Table
  useEffect(() => {
    if (usersRes) {
      // Set Users Data for Data Table
      const newUsers: IUserTable[] = usersRes.results.map((el, i) => {
        return {
          id: i + 1,
          username: el.login.username,
          name: `${el.name.first} ${el.name.last}`,
          email: el.email,
          gender: el.gender[0].toUpperCase() + el.gender.slice(1),
          registerDate: moment(el.registered.date).format("DD-MM-YYYY HH:mm"),
        };
      });
      if (newUsers.length > 0) setUsersTable(newUsers);

      // Set Off Loading Screen
      setLoading(false);
    }
  }, [usersRes]); // eslint-disable-line react-hooks/exhaustive-deps

  // On Search Keyword
  const onSearch = (newKeyword: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Params
    const paramsTemp: IUserParams = {
      ...params,
      page: 1,
      keyword: newKeyword,
    };
    if (!newKeyword) delete paramsTemp.keyword;
    setParams(paramsTemp);

    // Redirect Page
    router.push({ href: "/ssr", query: { ...paramsTemp } });
  };

  // On Filter Gender
  const onFilter = (newGender: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Params
    const paramsTemp: IUserParams = {
      ...params,
      page: 1,
      gender: newGender,
    };
    if (newGender === "all") delete paramsTemp.gender;
    setParams(paramsTemp);

    // Redirect Page
    router.push({ href: "/ssr", query: { ...paramsTemp } });
  };

  // Reset Search and Filter
  const onReset = () => {
    // Set On Loading Screen
    setLoading(true);

    // Set Params
    const paramsTemp: IUserParams = {
      page: 1,
      pageSize: 10,
      results: 5,
    };
    setParams(paramsTemp);

    // Redirect Page
    router.push({ href: "/ssr", query: { ...paramsTemp } });
  };

  // On Sort Column
  const OnSort = (newSortBy: string, newSortOrder: GridSortDirection) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Params
    const paramsTemp: IUserParams = {
      ...params,
      sortBy: String(newSortBy),
      sortOrder: String(newSortOrder),
    };
    setParams(paramsTemp);

    // Redirect Page
    router.push({ href: "/ssr", query: { ...paramsTemp } });
  };

  // On Change Page
  const onChangePage = (newPage: number) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Params
    const paramsTemp: IUserParams = { ...params, page: newPage };
    setParams(paramsTemp);

    // Redirect Page
    router.push({ href: "/ssr", query: { ...paramsTemp } });
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 99,
          }}
        ></Box>
      )}
      <Container>
        <BreadcrumbsComponent
          links={[
            {
              href: "/",
              title: "Home",
              active: false,
            },
            {
              href: "/ssr",
              title: "SSR Page",
              active: true,
            },
          ]}
        />
        <Box sx={{ marginBottom: "40px" }}>
          <Typography className="h-700-30 c-000000" variant="h1">
            List Users (SSR Rendered)
          </Typography>
        </Box>
        <SortFilterComponent
          handleSearch={onSearch}
          handleFilter={onFilter}
          handleReset={onReset}
        />
        <DataTableComponent
          params={params}
          users={usersTable}
          handleSort={OnSort}
        />
        <PaginationComponent params={params} handleChange={onChangePage} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Check Query
  if (!query.page || !query.pageSize || !query.results) {
    return {
      redirect: {
        destination: "/ssr/?page=1&pageSize=10&results=5",
      },
      props: {},
    };
  } else {
    // Get Endpoint
    const apis: Apis = new Axios().apis;

    // Set Props
    interface IProps {
      usersRes?: IUsersResponses;
    }
    const props: IProps = {};

    // Set Request Params
    const params: IUserParams = {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      results: Number(query.results),
      keyword: String(query.keyword),
      gender: String(query.gender),
      sortBy: String(query.sortBy),
      sortOrder: String(query.sortBy),
    };

    // Retrieve Users
    try {
      props.usersRes = await apis.retrieveUsers(params);
    } catch (err) {
      console.log(err);
    }

    // Return Props
    return { props };
  }
};

export default SSRPage;
