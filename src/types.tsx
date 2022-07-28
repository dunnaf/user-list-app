export interface IUserParams {
  page: number;
  pageSize: number;
  results: number;
  gender?: string;
  keyword?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IName {
  title: string;
  first: string;
  last: string;
}

export interface ILogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface IRegistered {
  date: Date;
  age: number;
}

export interface IResults {
  gender: string;
  name: IName;
  location: any;
  email: string;
  login: ILogin;
  dob: any;
  registered: IRegistered;
  phone: any;
  cell: any;
  id: any;
  picture: any;
  nat: any;
}

export interface IInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IUsersResponses {
  results: IResults[];
  info: IInfo;
}

export interface IUserTable {
  id: number;
  username: string;
  name: string;
  email: string;
  gender: string;
  registerDate: string;
}
