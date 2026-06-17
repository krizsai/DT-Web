import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";

const appStore = configureStore({
  reducer: {
    userSlice,
    feedSlice,
  },
});

export default appStore;