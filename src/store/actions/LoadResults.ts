import * as ActionTypes from "./ActionTypes";
import { Searching } from "./types";

const LoadResultsAction = (): Searching => {
  return {
    type: ActionTypes.LOAD_RESULTS,
    payload: 10,
  };
};

export default LoadResultsAction;
