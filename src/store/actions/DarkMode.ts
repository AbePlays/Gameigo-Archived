import * as ActionTypes from "./ActionTypes";
import { DarkModeActionType } from "./types";

const DarkModeAction = (): DarkModeActionType => {
  const className = document.querySelector("html")!.className;
  document.querySelector("html")!.className =
    className === "dark" ? "" : "dark";

  return {
    type: ActionTypes.TOGGLE_DARK_MODE,
  };
};

export default DarkModeAction;
