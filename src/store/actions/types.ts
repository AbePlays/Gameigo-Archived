import * as ActionTypes from "./ActionTypes";

export interface SearchingAction {
  type: typeof ActionTypes.SEARCHING;
}

export interface LoadResultsAction {
  type: typeof ActionTypes.LOAD_RESULTS;
  payload: number;
}

export type Searching = SearchingAction | LoadResultsAction;
