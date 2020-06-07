import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import taskReducer from "./tasks";
import UISettingsReducer from "./ui-settings";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UISettings"]
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  UISettings: UISettingsReducer
});

function logger({ getState }) {
  return next => action => {
    console.log("will dispatch", action);
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    console.log("state after dispatch : ", getState());
    return returnValue;
  };
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger)
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
export default store;
