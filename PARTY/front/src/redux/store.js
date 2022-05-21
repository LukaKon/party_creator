import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { announcementReducer } from "./slices/announcementSlice";
<<<<<<< HEAD
import { categoryReducer } from "./slices/categorySlice";
=======
import {profileReducer} from "./slices/profileSlice";
>>>>>>> 108ae43dc01d3cabc6df81680b12f926eb2f368a

export const store = configureStore({
    reducer: {
        announcements: announcementReducer,
<<<<<<< HEAD
        categories: categoryReducer,
=======
        profile: profileReducer,
        // category:categoryReducer,
>>>>>>> 108ae43dc01d3cabc6df81680b12f926eb2f368a
        // event:eventReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
