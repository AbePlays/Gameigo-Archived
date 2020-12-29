import { Dispatch } from "redux";

import { removeData } from "../../firebase/functions";
import * as ActionTypes from "./ActionTypes";
import { RemoveDataActionType } from "./types";

const RemoveDataAction = (id: number): RemoveDataActionType => {
  return {
    type: ActionTypes.REMOVE_DATA,
    payload: { uid: id },
  };
};

export const RemoveData = (id: number) => {
  return (dispatch: Dispatch) => {
    removeData(id);
    dispatch(RemoveDataAction(id));
  };
};
