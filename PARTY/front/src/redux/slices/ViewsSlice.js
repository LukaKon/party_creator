import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";

export const addView = createAsyncThunk(
    "views/add",
    async(data) => {
        try{
            const response = await axiosInstance.post('api/views/', data);
            return response.data;
        } catch(error){
            console.log("Adding view error: ", error.message);
            throw error
        }
    });

const viewsSlice = createSlice({
    name: "views",
    initialState:{
        loading: true,
        entities: "initial",
        error: "null",
    },
    reducers: {},
    extraReducers:{
        [addView.pending]: (state) => {
            state.loading = true
        },
        [addView.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [addView.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export const viewsReducer = viewsSlice.reducer