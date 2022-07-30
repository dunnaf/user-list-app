import { Box, Container, Typography } from "@mui/material";
import { GridSortDirection } from "@mui/x-data-grid";
import moment from "moment";
import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BreadcrumbsComponent from "~/components/Breadcrumbs";
import DataTableComponent from "~/components/DataTable";
import PaginationComponent from "~/components/Pagination";
import SortFilterComponent from "~/components/SortFilter";
import Axios from "~/plugins/axios";
import Apis from "~/plugins/axios/apis";
import { useAppSelector } from "~/stores/hooks";
import { addUsers, resetUsers } from "~/stores/reducer/users";
import { IResults, IUserParams, IUsersResponses, IUserTable } from "~/types";

const CSRPage: NextPage = () => {
  // Dispatch Store
  const dispatch = useDispatch();

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  // Get User from Store
  const usersStore = useAppSelector((state) => state.users.data);

  // Get Router
  const router: NextRouter = useRouter();

  // URL Params State
  const [params, setParams] = useState<IUserParams>({
    page: 1,
    pageSize: 10,
    results: 5,
  });

  // Users Data Table State
  const [usersTable, setUsersTable] = useState<IUserTable[]>([]);

  // Retrieve Users from Store
  const retrieveUsersFromStore = async (users: IUserTable[]) => {
    // Set Users Data for Data Table
    await setUsersTable(users);

    // Set Off Loading Screen
    await setLoading(false);
  };

  // Retrieve Users from API
  const retrieveUsersFromAPI = async (params: IUserParams) => {
    try {
      // Get Endpoint
      const apis: Apis = new Axios().apis;

      // Fetch API
      const users: IUsersResponses = await apis.retrieveUsers(params);

      // Set Users Data for Data Table
      const newUsers: IUserTable[] = users?.results.map((el, i) => {
        return {
          id: i + 1,
          username: el.login.username,
          name: `${el.name.first} ${el.name.last}`,
          email: el.email,
          gender: el.gender[0].toUpperCase() + el.gender.slice(1),
          registerDate: moment(el.registered.date).format("DD-MM-YYYY HH:mm"),
        };
      });
      if (newUsers.length > 0) {
        await dispatch(addUsers({ page: params.page, users: newUsers }));
        await setUsersTable(newUsers);

        // Set Off Loading Screen
        await setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Get Reactive Users Data for Data Table
  useEffect(() => {
    const userStore = usersStore[params.page];
    if (userStore) retrieveUsersFromStore(userStore);
    else retrieveUsersFromAPI(params);
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  // On Search Keyword
  const onSearch = (newKeyword: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    setParams({
      ...params,
      page: 1,
      ...(newKeyword && { keyword: String(newKeyword) }),
    });
  };

  // On Filter Gender
  const onFilter = (newGender: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    setParams({
      ...params,
      page: 1,
      ...(newGender !== "all" && { gender: String(newGender) }),
    });
  };

  // Reset Search and Filter
  const onReset = () => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    setParams({
      page: 1,
      pageSize: 10,
      results: 5,
    });
  };

  // On Sort Column
  const onSort = (newSortBy: string, newSortOrder: GridSortDirection) => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    setParams({
      ...params,
      sortBy: String(newSortBy),
      sortOrder: String(newSortOrder),
    });
  };

  // On Change Page
  const onChangePage = (newPage: number) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Request Params
    setParams({ ...params, page: newPage });
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
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
              href: "/csr",
              title: "CSR Page",
              active: true,
            },
          ]}
        />
        <Box sx={{ marginBottom: "40px" }}>
          <Typography className="h-700-30 c-000000" variant="h1">
            List Users (CSR Rendered)
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
          handleSort={onSort}
        />
        <PaginationComponent params={params} handleChange={onChangePage} />
      </Container>
    </>
  );
};

export default CSRPage;
