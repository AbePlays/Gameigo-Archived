import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";

const RootReducer = combineReducers({
  search: SearchReducer,
});

export default RootReducer;
