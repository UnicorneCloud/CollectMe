
export function tipsFetchSuccess(tips: Object) {
  return {
    type: "TIPS_FETCH_SUCCESS",
    tips
  };
}
export function tipsFetch(url: any) {
  return dispatch => {
    dispatch(tipsFetchSuccess((url: any)));
  };
}