import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mapSlice from "./map/mapSlice";

const appReducer = combineReducers({
  maps: mapSlice.reducer,
});

const store = configureStore({
  reducer: appReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
