import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { announcementReducer } from "../features/announcement/announcementSlice";

export const store = configureStore({
    reducer: {
        announcements: announcementReducer,
        // category:categoryReducer,
        // event:eventReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
