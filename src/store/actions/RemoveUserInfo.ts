import * as ActionTypes from "./ActionTypes";
import { UserInfoActionType } from "./types";

const RemoveUserInfoAction = (): UserInfoActionType => {
  return {
    type: ActionTypes.REMOVE_USER,
  };
};

export default RemoveUserInfoAction;
