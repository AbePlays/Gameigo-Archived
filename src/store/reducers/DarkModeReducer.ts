import { DarkModeState } from "./types";
import { DarkModeActionType } from "../actions/types";

const initialState: DarkModeState = {
  isDark: false,
};

const DarkModeReducer = (state = initialState, action: DarkModeActionType) => {
  console.log("[DarkModeReducer]");
  return {
    isDark: !state.isDark,
  };
};

export default DarkModeReducer;
