import * as ActionTypes from "./ActionTypes";

export interface DarkModeAction {
  type: typeof ActionTypes.TOGGLE_DARK_MODE;
}

export type DarkModeActionType = DarkModeAction;
