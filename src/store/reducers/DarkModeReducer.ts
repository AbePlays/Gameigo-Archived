import * as ActionTypes from "../actions/ActionTypes";
import { DarkModeState } from "./types";
import { DarkModeActionType } from "../actions/types";

const initialState: DarkModeState = {
  isDark: true,
};

const DarkModeReducer = (state = initialState, action: DarkModeActionType) => {
  console.log("[DarkModeReducer]");
  switch (action.type) {
    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        isDark: !state.isDark,
      };
    default:
      return state;
  }
};

export default DarkModeReducer;
