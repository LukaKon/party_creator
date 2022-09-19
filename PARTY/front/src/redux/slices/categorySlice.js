import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        try {
            const response = await axiosInstance.get("/api/categories");
            return response.data;
        } catch (err) {
            console.log("Fetch categories error: ", err.message);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        loading: true,
        categories: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const categoryReducer = categorySlice.reducer;
