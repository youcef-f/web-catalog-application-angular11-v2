export enum ProductActionsTypes {

  // Action for nav-bar
   GET_ALL_PRODUCTS = '[Product] Get all products',
   GET_SELECTED_PRODUCTS = '[Product] Get selected products',
   GET_AVAILABLE_PRODUCTS = '[Product] Get availables products',
   SEARCH_PRODUCTS = '[Product] search products',
   NEW_PRODUCT = '[Product] new product',

   // Actions for product list
   DELETE_PRODUCT = '[Product] delete product',
   EDIT_PRODUCT = '[Product] edit product',
   SELECT_PRODUCT = '[Product] select product'
}

export interface ActionEvent {
  type: ProductActionsTypes;
  PayloadParamFun?: any;
}



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
