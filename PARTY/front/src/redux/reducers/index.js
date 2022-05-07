import { combineReducers } from "@reduxjs/toolkit";
import { announcementReducer } from "./announcementSlice";

export const rootReducer = combineReducers({
    announcement: announcementReducer,
});
