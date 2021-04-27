export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState?: DataStateEnum;
  myData?: T;
  errorMessage?: string;
}
