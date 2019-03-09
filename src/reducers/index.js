import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import globalReducer from './global'

export default combineReducers({
  form: formReducer,
  homeReducer,
  globalReducer
});
