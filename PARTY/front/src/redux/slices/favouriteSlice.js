import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";

export const addFavourite = createAsyncThunk(
    "favourite/add",
    async(data) => {
        try{
            const response = await axiosInstance.post('api/favourites/', data);
            return response.data;
        } catch (error) {
            console.log("Adding favourite error: ", error.message);
        }
    });

export const deleteFavourite = createAsyncThunk(
    "favourite/delete",
    async(data) => {
        try{
            const response = await axiosInstance.post('api/favourites/delete/', data);
            return response.data
        } catch(error){
            console.log("Deleting favourite error: ", error.message);
        }
    });


const favouriteSlice = createSlice({
    name:  "favourite",
    initialState: {
        loading: true,
        entities: "initial",
        error: null,
    },
    reducers: {},
    extraReducers:{
        [addFavourite.pending && deleteFavourite.pending]: (state) => {
            state.loading = true
        },
        [addFavourite.fulfilled && deleteFavourite.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [addFavourite.rejected && deleteFavourite.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // [deleteFavourite.pending]: (state) => {
        //     state.loading = true
        // },
        // [deleteFavourite.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.entities = action.payload
        // },
        // [deleteFavourite.rejected]: (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // }
    }
})

export const favouriteReducer = favouriteSlice.reducer