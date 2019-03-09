import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import locationReducer from './location'
import collectSchedule from './collectSchedule'

export default combineReducers({
  form: formReducer,
  homeReducer,
  locationReducer,
  collectSchedule
});
