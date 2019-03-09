
export function itemsHasErrored(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    dispatch(itemsFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}
export function itemsHeaderFetchDataSuccess(itemsHeader: Object) {
  return {
    type: "ITEMS_HEADER_FETCH_DATA_SUCCESS",
    itemsHeader
  };
}
export function itemsHeaderFetchData(url: any) {
  return dispatch => {
    dispatch(itemsHeaderFetchDataSuccess((url: any)));
    dispatch(itemsIsLoading(false));
  };
}