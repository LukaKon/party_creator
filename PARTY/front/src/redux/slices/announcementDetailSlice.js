import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchAnnouncementDetails = createAsyncThunk(
    "announcement/getDetails",
    async (slug) => {
        try {
            const response = await axiosInstance("announcements/", slug);
            return response.data;
        } catch (err) {
            console.log("Fetch announcement details error: ", err);
        }
    }
);

const announcementDetailsSlice = createSlice({
    name: "announcementDetails",
    initialState: {
        loading: false,
        details: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncementDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAnnouncementDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(fetchAnnouncementDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {} = announcementDetailsSlice.actions;
export const announcementDetailsReducer = announcementDetailsSlice.reducer;