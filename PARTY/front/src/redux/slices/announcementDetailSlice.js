import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchAnnouncementDetails = createAsyncThunk(
  "announcement/getDetails",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`api/announcements/${slug}`); //, slug);
      return response.data;
    } catch (error) {
      console.log("Fetch announcement details error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/announcements/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Accept: "image/jpeg",
          Accept: "image/png",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Sent announcement error: ", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAnnouncement = createAsyncThunk(
  "announcements/editAnnouncement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("api/announcements", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Accept: "image/jpeg",
          Accept: "image/png",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Edit announcement errror: ", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `api/announcements/${data.slug}`
      );
      return response;
    } catch (error) {
      console.log("Delete announcement error:", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const announcementDetailsSlice = createSlice({
  name: "announcementDetails",
  initialState: {
    loading: true,
    entities: [],
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

export const {} = announcementDetailsSlice.actions;
export const announcementDetailsReducer = announcementDetailsSlice.reducer;
