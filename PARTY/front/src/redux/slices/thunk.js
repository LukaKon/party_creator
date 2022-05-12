import { axiosInstance } from "../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addAnnouncement } from "./announcementSlice";

// TODO: not working. For now I don't know what to do

export const fetchAnnouncements = createAsyncThunk(
    "announcements/fetchAnnouncements",
    async (params) => {
        try {
            await axiosInstance
                .get("/api/announcements")
                .dispatch(addAnnouncement(params));
            // return [...response.data];
            // return response.data;
        } catch (err) {
            console.log("thunk error: ", err.message);
        }
    }
);
