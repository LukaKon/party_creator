import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

// Thunk function
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (data) => {
    try {
      if (data.main_page) {
        const response = await axiosInstance.get(
          `/api/announcements/?main_page=${data.main_page}`
        );
        return response.data;
      } else if (data.category) {
        const response = await axiosInstance.get(
          "/api/announcements/?category=" + data.category
        );
        return response.data;
      }
    } catch (err) {
      console.log("Fetch announcements error: ", err.message);
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (data) => {
    console.log('axios data: ', data)
    try {
      await axiosInstance.post("api/announcements/", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log("Sent announcement error: ", err.message);
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (data) => {
    try {
      await axiosInstance.delete("api/announcements/" + data.slug);
    } catch (err) {
      console.log("Delete announcement error:", err.message);
    }
  }
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    loading: true,
    entities: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.push(action.payload);
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = state.entities.filter((element) => {
          return element !== action.payload.slug;
        });
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addAnnouncement } = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;
