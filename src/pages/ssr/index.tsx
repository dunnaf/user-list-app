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

interface Props {
  usersRes: IUsersResponses;
}

const SSRPage: NextPage<Props> = ({ usersRes }) => {
  // Get Router
  const router: NextRouter = useRouter();
  const { page, pageSize, results, keyword, gender } = router.query;

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  // Get Reactive Users Data for Data Table
  const [usersTable, setUsersTable] = useState<IUserTable[]>([]);
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

    // Clean Users Data When Unmounted
    return () => {
      setLoading(true);
      setUsersTable([]);
    };
  }, [usersRes]); // eslint-disable-line react-hooks/exhaustive-deps

  // On Search Keyword
  const onSearch = (newKeyword: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Redirect Page
    router.push(
      `/ssr?page=1&pageSize=${pageSize}&results=${results}${
        newKeyword === "" ? "" : `&keyword=${newKeyword}`
      }${!gender ? "" : `&gender=${gender}`}`
    );
  };

  // On Filter Gender
  const onFilter = (newGender: string) => {
    // Set On Loading Screen
    setLoading(true);

    // Redirect Page
    router.push(
      `/ssr?page=1&pageSize=${pageSize}&results=${results}${
        !keyword ? "" : `&keyword=${keyword}`
      }${newGender === "all" ? "" : `&gender=${newGender}`}`
    );
  };

  // Reset Search and Filter
  const onReset = () => {
    // Set On Loading Screen
    setLoading(true);

    // Redirect Page
    router.push(`/ssr/?page=1&pageSize=10&results=5`);
  };

  // On Change Page
  const onChangePage = (newPage: number) => {
    // Set On Loading Screen
    setLoading(true);

    // Redirect Page
    router.push(
      `/ssr?page=${newPage}&pageSize=${pageSize}&results=${results}${
        !keyword ? "" : `&keyword=${keyword}`
      }${!gender ? "" : `&gender=${gender}`}`
    );
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
        <DataTableComponent users={usersTable} />
        <PaginationComponent handleChange={onChangePage} />
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
