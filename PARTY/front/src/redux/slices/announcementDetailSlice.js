import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchAnnouncementDetails = createAsyncThunk(
    "announcement/getDetails",
    async (slug) => {
        try {
            const response = await axiosInstance(`api/announcements/${slug}`); //, slug);
            console.log("resp in thunk: ", response);
            return response.data;
        } catch (error) {
            console.log("Fetch announcement details error: ", error);
            throw error.data
        }
    }
);

const announcementDetailsSlice = createSlice({
    name: "announcementDetails",
    initialState: {
        loading: true,
        entities: null,
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
                state.entities = action.payload;
            })
            .addCase(fetchAnnouncementDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {} = announcementDetailsSlice.actions;
export const announcementDetailsReducer = announcementDetailsSlice.reducer;
