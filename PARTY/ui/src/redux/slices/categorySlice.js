import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axiosInstance.get("/api/categories/");
    return response.data;
  } catch (error) {
    console.log("Fetch categories error: ", error.message);
    throw error;
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    loading: true,
    entities: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
