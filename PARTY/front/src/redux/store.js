import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { announcementReducer } from "./slices/announcementSlice";
import { announcementDetailsReducer } from "./slices/announcementDetailSlice";
import { categoryReducer } from "./slices/categorySlice";
import { profileReducer } from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        announcements: announcementReducer,
        announcementDetails: announcementDetailsReducer,
        categories: categoryReducer,
        profile: profileReducer,
        // event:eventReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
