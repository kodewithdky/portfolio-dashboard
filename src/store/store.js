import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    softwareApplications: softwareApplicationReducer,
    project: projectReducer,
  },
});
