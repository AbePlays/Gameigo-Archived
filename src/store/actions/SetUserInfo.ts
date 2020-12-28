import * as ActionTypes from "./ActionTypes";
import { UserInfoActionType } from "./types";

const SetUserInfoAction = (email: string, uid: string): UserInfoActionType => {
  return {
    type: ActionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
    },
  };
};

export default SetUserInfoAction;
