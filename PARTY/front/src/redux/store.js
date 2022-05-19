import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { announcementReducer } from "./slices/announcementSlice";
import {profileReducer} from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        announcements: announcementReducer,
        profile: profileReducer,
        // category:categoryReducer,
        // event:eventReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
