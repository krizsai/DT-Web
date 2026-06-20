import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    userSlice,
    feedSlice,
    connectionSlice,
  },
});

export default appStore;
