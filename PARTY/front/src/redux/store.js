import { configureStore } from "@reduxjs/toolkit";
// import { rootReducer } from "./reducers";
// import thunk from "redux-thunk";
import logger from "redux-logger";
import { announcementReducer } from "./reducers/announcementSlice";

export const store = configureStore({
    reducer: {
        announcement: announcementReducer,
        // category:categoryReducer,
        // event:eventReducer,
    },
    middleware: [logger], // thunk is automatically added -> https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-configurestore
    // reducer: {
    // announcement: announcementReducer,
    // },
});
