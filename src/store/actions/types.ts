import { Game } from "../../components/Home";
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
    name: string;
    favorites: Game[];
  };
}

export type AddDataActionType = {
  type: typeof ActionTypes.ADD_DATA;
  payload: {
    game: Game;
  };
};

export type RemoveDataActionType = {
  type: typeof ActionTypes.REMOVE_DATA;
  payload: {
    uid: number;
  };
};

export type UserInfoActionType =
  | RemoveUserInfoAction
  | SetUserInfoAction
  | AddDataActionType
  | RemoveDataActionType;

export type DarkModeActionType = DarkModeAction;
