import { ActionTypes, CheckTokenActionType } from "./Actions";
import { AppStateType } from "./State";

export const TokenReducer = (
  state: AppStateType,
  action: CheckTokenActionType
) => {
  switch (action.type) {
    case ActionTypes.CheckToken:
      return { ...state, userToken: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
