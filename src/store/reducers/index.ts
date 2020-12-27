import { combineReducers } from "redux";

import DarkModeReducer from "./DarkModeReducer";

const RootReducer = combineReducers({
  darkMode: DarkModeReducer,
});

export default RootReducer;
