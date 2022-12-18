import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

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
    } catch (error) {
      console.log("Fetch announcements error: ", error.message);
      throw error;
    }
  }
);

// export const fetchAnnouncementDetails = createAsyncThunk(
//     "announcement/getDetails",
//   async (data) => {
//     try {
//       const response = await axiosInstance.get(`api/announcements/${data}`);
//       return response.data;
//     } catch (error) {
//       console.log("Fetch announcement details error: ", error.message);
//       throw error.data;
//     }
//   }
// );

// export const createAnnouncement = createAsyncThunk(
//   "announcements/createAnnouncement",
//   async (data) => {
//     try {
//       const response = await axiosInstance.post("api/announcements/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Content-Type": "application/json",
//           Accept: "image/jpeg",
//           Accept: "image/png",
//         },
//       });
//       return response;
//     } catch (error) {
//       console.log("Sent announcement error: ", error.message);
//       throw error;
//     }
//   }
// );
//
// export const editAnnouncement = createAsyncThunk(
//   "announcements/editAnnouncement",
//   async (data) => {
//     try {
//       const response = await axiosInstance.patch("api/announcements", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Content-Type": "application/json",
//           Accept: "image/jpeg",
//           Accept: "image/png",
//         },
//       });
//       return response;
//     } catch (error) {
//       console.log("Edit announcement errror: ", error.message);
//       throw error;
//     }
//   }
// );
//
// export const deleteAnnouncement = createAsyncThunk(
//   "announcements/deleteAnnouncement",
//   async (data) => {
//     try {
//       const response = await axiosInstance.delete(
//         `api/announcements/${data.slug}`
//       );
//       return response;
//     } catch (error) {
//       console.log("Delete announcement error:", error.message);
//       throw error;
//     }
//   }
// );

export const searchAnnouncement = createAsyncThunk(
  "announcements/searchAnnouncement",
  async (data) => {
    try {
      const response = await axiosInstance.get(
        "/api/announcements/?search=" +
          data.search +
          "&submit=" +
          data.submit +
          "&category=" +
          data.category
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
      // .addCase(fetchAnnouncementDetails.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(fetchAnnouncementDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.entities = action.payload;
      // })
      // .addCase(fetchAnnouncementDetails.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // .addCase(createAnnouncement.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(createAnnouncement.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.entities.push(action.payload);
      // })
      // .addCase(createAnnouncement.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // })
      // .addCase(deleteAnnouncement.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(deleteAnnouncement.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.entities = state.entities.filter((element) => {
      //     return element !== action.payload.slug;
      //   });
      // })
      // .addCase(deleteAnnouncement.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // })
      // .addCase(searchAnnouncement.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(searchAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action", action.payload);
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
