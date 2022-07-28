import { Box, Container, Typography } from "@mui/material";
import moment from "moment";
import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  // Get User from Store
  const usersStore = useAppSelector((state) => state.users.data);

  // Get Router
  const router: NextRouter = useRouter();
  const { page, pageSize, results, keyword, gender } = router.query;

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  const retrieveUsersFromStore = async (users: IUserTable[]) => {
    // Set Users Data for Data Table
    setUsersTable(users);

    // Set Off Loading Screen
    setLoading(false);
  };

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
        dispatch(addUsers({ page: Number(page), users: newUsers }));
        setUsersTable(newUsers);
      }

      // Set Off Loading Screen
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Get Reactive Users Data for Data Table
  const [usersTable, setUsersTable] = useState<IUserTable[]>([]);
  useEffect(() => {
    // Check Query
    if (!page || !pageSize || !results) {
      router.push("/csr/?page=1&pageSize=10&results=5");
    } else {
      const userStore = usersStore[Number(page)];
      if (userStore) {
        retrieveUsersFromStore(userStore);
      } else {
        // Set Request Params
        const params: IUserParams = {
          page: Number(page),
          pageSize: Number(pageSize),
          results: Number(results),
        };
        if (gender) params.gender = String(gender);
        if (keyword) params.keyword = String(keyword);

        // Retrieve Users
        retrieveUsersFromAPI(params);
      }
    }

    // Clean Users Data When Unmounted
    return () => {
      setLoading(true);
      setUsersTable([]);
    };
  }, [page, pageSize, results, keyword, gender]); // eslint-disable-line react-hooks/exhaustive-deps

  // On Search Keyword
  const onSearch = (newKeyword: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    const params: IUserParams = {
      page: 1,
      pageSize: Number(pageSize),
      results: Number(results),
    };
    if (newKeyword) params.keyword = String(newKeyword);
    if (gender) params.gender = String(gender);

    // Replace URL Query
    router.replace({ query: { ...params } });
  };

  // On Filter Gender
  const onFilter = (newGender: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Set Request Params
    const params: IUserParams = {
      page: 1,
      pageSize: Number(pageSize),
      results: Number(results),
    };
    if (newGender !== "all") params.gender = String(newGender);
    if (keyword) params.keyword = String(keyword);

    // Replace URL Query
    router.replace({ query: { ...params } });
  };

  // Reset Search and Filter
  const onReset = () => {
    // Set On Loading Screen
    setLoading(true);

    // Reset Users on Store
    dispatch(resetUsers());

    // Redirect Page
    router.push(`/csr/?page=1&pageSize=10&results=5`);
  };

  // On Change Page
  const onChangePage = (newPage: number) => {
    // Set On Loading Screen
    setLoading(true);

    // Set Request Params
    const params: IUserParams = {
      page: newPage,
      pageSize: Number(pageSize),
      results: Number(results),
    };
    if (keyword) params.keyword = String(keyword);
    if (gender) params.gender = String(gender);

    // Replace URL Query
    router.replace({ query: { ...params } });
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
        <DataTableComponent users={usersTable} />
        <PaginationComponent handleChange={onChangePage} />
      </Container>
    </>
  );
};

export default CSRPage;
