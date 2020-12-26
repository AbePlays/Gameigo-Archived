import * as ActionTypes from "./ActionTypes";

const LoadResultsAction = () => {
  return {
    type: ActionTypes.LOAD_RESULTS,
    payload: 10,
  };
};

export default LoadResultsAction;
