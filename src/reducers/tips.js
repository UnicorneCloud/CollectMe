const initialState = {
  tips: [],
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "TIPS_FETCH_SUCCESS":
      return {...state, tips: action.tips};
    default:
      return state;
  }
}
