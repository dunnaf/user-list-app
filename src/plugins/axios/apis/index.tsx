import { IUserParams, IUsersResponses } from "~/types";
import { AxiosInstance, AxiosResponse } from "axios";

class Apis {
  constructor(private adapter: AxiosInstance) {}

  public retrieveUsers(params: IUserParams): Promise<IUsersResponses> {
    return this.adapter
      .get("/", { params: { ...params } })
      .then((res: AxiosResponse) => res.data);
  }
}

export default Apis;
