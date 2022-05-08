export interface AppStateType {
  userToken: string | null;
}

export const initialAppState: AppStateType = {
  userToken: null,
};
