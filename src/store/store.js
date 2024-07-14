import forgotResetReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotResetReducer,
  messages: messageReducer,
  timeline: timelineReducer,
  skill: skillReducer,
  softwareApplications: softwareApplicationReducer,
  project: projectReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

/*
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotResetReducer,
  messages: messageReducer,
  timeline: timelineReducer,
  skill: skillReducer,
  softwareApplications: softwareApplicationReducer,
  project: projectReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     forgotPassword: forgotResetReducer,
//     messages: messageReducer,
//     timeline: timelineReducer,
//     skill: skillReducer,
//     softwareApplications: softwareApplicationReducer,
//     project: projectReducer,
//   },
// });

*/
