import { GridSortDirection } from "@mui/x-data-grid";
import { IUserParams, IUserTable } from "~/types";

export interface Props {
  params: IUserParams;
  users: IUserTable[];
  handleSort: (sortBy: string, sortOrder: GridSortDirection) => void;
}
