import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "../reducers";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,

    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
