//Redux
import { createStore, applyMiddleware } from "redux";
import { history } from "../features/API/History_API/historyFunctions";
import rootReducer from "./rootReducer";

//Middleware
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";

//Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Create Config (only session persist)
const persistConfig = {
  key: "AGL",
  storage,
  whitelist: ["session"]
};

//Persist Root Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Middleware
const middleware = [thunk, routerMiddleware(history)];

//Create Store and Persistor
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware));

const persistor = persistStore(store);

export { store, persistor };
