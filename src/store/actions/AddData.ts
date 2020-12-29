import { Dispatch } from "redux";

import * as ActionTypes from "./ActionTypes";
import { Game } from "../../components/Home";
import { addData } from "../../firebase/functions";
import { AddDataActionType } from "./types";

const AddDataAction = (data: Game): AddDataActionType => {
  return {
    type: ActionTypes.ADD_DATA,
    payload: {
      game: data,
    },
  };
};

export const AddData = (data: Game) => {
  return (dispatch: Dispatch) => {
    addData(data);
    dispatch(AddDataAction(data));
  };
};
