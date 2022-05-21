import {combineReducers} from "@reduxjs/toolkit";
import {announcementReducer} from "./announcementSlice";
import {profileReducer} from "../slices/profileSlice";

export const rootReducer = combineReducers({
    announcement: announcementReducer,
    profile: profileReducer,
    // category:categoryReducer,
    // event:eventReducer,
});
