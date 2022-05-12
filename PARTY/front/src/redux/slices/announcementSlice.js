import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

// Thunk function
export const fetchAnnouncements = createAsyncThunk(
    "announcements/fetchAnnouncements",
    async () => {
        try {
            const response = await axiosInstance.get("/api/announcements");
            // .dispatch(addAnnouncement);
            // return [...response.data];
            return response.data;
        } catch (err) {
            console.log("thunk error: ", err.message);
        }
    }
);

const announcementSlice = createSlice({
    name: "announcements",
    initialState: {
        loading: false,
        entities: ["test 1", "test 2"],
        error: null,
    },
    reducers: {
        addAnnouncement(state, action) {
            return {
                ...state,
                entities: action.payload,
            };
        },
        deleteAnnouncement(state, action) {
            return {
                ...state,
                entities: state.entities.filter(
                    (ann) => ann !== action.payload
                ),
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncements.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action) => {
                // const newEntities = {};
                // action.payload.forEach((ann) => {
                // newEntities[ann.uuid] = ann;
                // });
                // console.log("newEntities: ", newEntities);
                // (state.entities = newEntities),

                state.loading = false;
                // state.entities = [...action.payload];
                state.entities = action.payload;
                // console.log("payload: ", action.payload);
                // (state.entities = action.payload), (state.loading = false);
            })
            .addCase(fetchAnnouncements.rejected, (state, action) => {
                (state.error = action.payload), (state.loading = false);
            });
    },
});

export const {
    addAnnouncement,
    deleteAnnouncement,
    // announcementFetching,
    // announcementFetched,
    // announcementError,
} = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;
