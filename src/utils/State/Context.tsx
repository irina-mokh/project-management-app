import React from "react";
import { CheckTokenActionType } from "./Actions";
import { AppStateType, initialAppState } from "./State";

export const AppContext = React.createContext<{
  state: AppStateType;
  dispatch: React.Dispatch<CheckTokenActionType>;
}>({
  state: initialAppState,
  dispatch: () => undefined,
});
