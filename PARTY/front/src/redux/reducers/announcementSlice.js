import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    // {
    //     id: 0,
    //     item: "",
    //     completed: false,
    // },
];

const announcementSlice = createSlice({
    name: "announcement",
    initialState,
    reducers: {
        addAnnouncement: (state, action) => {
            state.push(action.payload);
            return state;
        },
    },
});

export const { addAnnouncement } = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;
