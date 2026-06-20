import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestsSlice from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    userSlice,
    feedSlice,
    connectionSlice,
    requestsSlice,
  },
});

export default appStore;
