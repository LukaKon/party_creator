import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (data, { rejectWithValue }) => {
    try {
      if (data.main_page) {
        const response = await axiosInstance.get(
          `/api/announcements/?main_page=${data.main_page}`
        );
        return response.data;
      } else if (data.category) {
        const response = await axiosInstance.get(
          `/api/announcements/?category=${data.category}`
        );
        return response.data;
      } else if (data.id) {
        const response = await axiosInstance.get(
            `/api/announcements/?id=${data.id}`
        )
        return response.data;
      }
    } catch (error) {
      console.log("Fetch announcements error: ", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchAnnouncement = createAsyncThunk(
  "announcements/searchAnnouncement",
  async (data) => {
    try {
      const response = await axiosInstance.get(
        `/api/announcements/?search=${data.search}&submit=${data.submit}&category=${data.category}`
      );
      return response.data;
    } catch (error) {
      console.log("Search announcements error: ", error.message);
      throw error;
    }
  }
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    loading: false,
    // loading: true,
    entities: [],
    announcementsFound: [],
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
      .addCase(searchAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementsFound = action.payload;
      })
      .addCase(searchAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addAnnouncement } = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;
