import * as ActionTypes from "../actions/ActionTypes";
import { UserInfoActionType } from "../actions/types";
import { UserInfoState } from "./types";

const initialState: UserInfoState = {
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
    case ActionTypes.ADD_DATA:
      return {
        ...state,
        favorites: [...state.favorites, action.payload.game],
      };
    default:
      return state;
  }
};

export default DarkModeReducer;
