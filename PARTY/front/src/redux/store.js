import { configureStore } from "@reduxjs/toolkit";
// import { announcementReducer } from "./reducers/announcementSlice";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
    // reducer: {
    // announcement: announcementReducer,
    // },
});
