import * as ActionTypes from "./ActionTypes";
import { Searching } from "./types";

const SearchingAction = (): Searching => {
  return {
    type: ActionTypes.SEARCHING,
  };
};

export default SearchingAction;
