export enum ActionTypes {
  CheckToken,
}

export interface CheckTokenActionType {
  type: ActionTypes.CheckToken;
  payload: string | null;
}
