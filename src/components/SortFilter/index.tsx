import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Props } from "./types";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "use-debounce";

const SortFilterComponent: React.FC<Props> = ({
  handleSearch,
  handleFilter,
  handleReset,
}) => {
  // On Search
  const [searchKey, setSearchKey] = useState<string>("");
  const onChangeSearchKey = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };
  const [debouncedKey] = useDebounce(searchKey, 1000);
  useEffect(() => {
    handleSearch(debouncedKey || "");
  }, [debouncedKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedGender, setSelectedGender] = useState<string>("all");
  const genders: string[] = ["male", "female"];
  const onChangeSelectedGender = (event: SelectChangeEvent<string>) => {
    setSelectedGender(event.target.value);
  };
  useEffect(() => {
    handleFilter(selectedGender);
  }, [selectedGender]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{ marginBottom: "30px" }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="search">Search</InputLabel>
              <OutlinedInput
                id="search"
                label="Search"
                type="text"
                value={searchKey}
                onChange={onChangeSearchKey}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                id="gender"
                label="Gender"
                value={selectedGender}
                onChange={onChangeSelectedGender}
              >
                <MenuItem value={"all"}>All</MenuItem>
                {genders.map((el, i) => (
                  <MenuItem key={i} value={el}>
                    {el[0].toUpperCase() + el.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={"auto"}>
            <Button
              variant="outlined"
              size={"large"}
              onClick={() => {
                setSearchKey("");
                setSelectedGender("all");
                handleReset();
              }}
            >
              Reset Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SortFilterComponent;
