import * as ActionTypes from "./ActionTypes";

export interface DarkModeAction {
  type: typeof ActionTypes.TOGGLE_DARK_MODE;
}

export interface RemoveUserInfoAction {
  type: typeof ActionTypes.REMOVE_USER;
}

export interface SetUserInfoAction {
  type: typeof ActionTypes.SET_USER;
  payload: {
    email: string;
    uid: string;
  };
}

export type UserInfoActionType = RemoveUserInfoAction | SetUserInfoAction;

export type DarkModeActionType = DarkModeAction;
