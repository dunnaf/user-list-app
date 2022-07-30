import { IUserParams } from "~/types";

export interface Props {
  params: IUserParams;
  handleChange: (page: number) => void;
}
