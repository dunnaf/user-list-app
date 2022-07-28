import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";

const reducer = combineReducers({ users });

export default reducer;
