const initialState = {
  items: [],
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "ITEMS_FETCH_CALENDER_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
