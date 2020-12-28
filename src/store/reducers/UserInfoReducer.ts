import * as ActionTypes from "../actions/ActionTypes";
import { UserInfoActionType } from "../actions/types";
import { UserInfoSate } from "./types";

const initialState: UserInfoSate = {
  email: "",
  uid: "",
};

const DarkModeReducer = (state = initialState, action: UserInfoActionType) => {
  console.log("[UserInfoReducer]");
  switch (action.type) {
    case ActionTypes.REMOVE_USER:
      return {
        email: "",
        uid: "",
      };
    case ActionTypes.SET_USER:
      return {
        email: action.payload.email,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export default DarkModeReducer;
