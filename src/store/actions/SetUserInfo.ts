import * as ActionTypes from "./ActionTypes";
import { UserInfoActionType } from "./types";

const SetUserInfoAction = (
  email: string,
  uid: string,
  name: string
): UserInfoActionType => {
  return {
    type: ActionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
      name: name,
    },
  };
};

export default SetUserInfoAction;
