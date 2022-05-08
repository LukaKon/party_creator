import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../axios";

// Thunk function
export const fetchAnnouncements = createAsyncThunk(
    "announcements/fetchAnnouncements",
    async () => {
        // const response = axiosInstance.get("/api/announcements");
        const response = await fetch("http://localhost:8000/api/announcements");
        response.announcements; // TODO: to check is it ok, maybe announcement or something else
    }
);

const initialState = [
    //     {
    //     loading: false,
    //     entities: [],
    //     error: [], ?? - is it supported somehow in new redux in different way?
    // }
];

const announcementSlice = createSlice({
    name: "announcements",
    initialState: {
        loading: false,
        entities: [],
        error: "",
    },
    reducers: {
        addAnnouncement(state, action) {
            const ann = action.payload;
            state.entities[ann.uuid] = ann;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncements.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action) => {
                const newEntities = {};
                action.payload.forEach((ann) => {
                    newEntities[ann.uuid] = ann;
                });
                (state.entities = newEntities), (state.loading = false);
            });
    },
});

export const { announcementFetching, announcementFetched, announcementError } =
    announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;
