import Apis from "./apis";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Axios {
  private reqConfig: AxiosRequestConfig;
  private instance: AxiosInstance;
  public apis: Apis;

  constructor() {
    this.reqConfig = {
      baseURL: process.env.API_HOST,
      timeout: 10000,
    };
    this.instance = axios.create({ ...this.reqConfig });
    this.apis = new Apis(this.instance);
  }
}

export default Axios;
