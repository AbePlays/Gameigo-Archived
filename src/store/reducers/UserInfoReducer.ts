import * as ActionTypes from "../actions/ActionTypes";
import { UserInfoActionType } from "../actions/types";
import { UserInfoSate } from "./types";

const initialState: UserInfoSate = {
  email: "",
  uid: "",
  name: "",
  favorites: [],
};

const DarkModeReducer = (state = initialState, action: UserInfoActionType) => {
  console.log("[UserInfoReducer]");
  switch (action.type) {
    case ActionTypes.REMOVE_USER:
      return {
        email: "",
        uid: "",
        name: "",
        favorites: [],
      };
    case ActionTypes.SET_USER:
      return {
        email: action.payload.email,
        uid: action.payload.uid,
        name: action.payload.name,
        favorites: action.payload.favorites,
      };
    default:
      return state;
  }
};

export default DarkModeReducer;
