import { Game } from "../../components/Home";
import * as ActionTypes from "./ActionTypes";
import { UserInfoActionType } from "./types";

const SetUserInfoAction = (
  email: string,
  uid: string,
  name: string,
  favorites: Game[]
): UserInfoActionType => {
  return {
    type: ActionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
      name: name,
      favorites: favorites,
    },
  };
};

export default SetUserInfoAction;
