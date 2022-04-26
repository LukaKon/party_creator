import { configureStore } from "@reduxjs/toolkit";
import { announcementReducer } from "./reducers/announcementSlice";

export const store = configureStore({
    reducer: {
        announcement: announcementReducer,
    },
});
