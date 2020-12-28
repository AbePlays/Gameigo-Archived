import { combineReducers } from "redux";

import DarkModeReducer from "./DarkModeReducer";
import UserInfoReducer from "./UserInfoReducer";

const RootReducer = combineReducers({
  darkMode: DarkModeReducer,
  userInfo: UserInfoReducer,
});

export default RootReducer;
