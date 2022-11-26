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
            throw error
        }
    });

export const getMyFavourites = createAsyncThunk(
    "favourite/get",
    async() => {
        try{
            const response = await axiosInstance.get('api/favourites/');
            return response.data;
        } catch (error) {
            console.log("Getting favourite error: ", error.message);
            throw error
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
            throw error
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
        [addFavourite.pending || deleteFavourite.pending || getMyFavourites.pending]: (state) => {
            state.loading = true
        },
        [addFavourite.fulfilled || deleteFavourite.fulfilled || getMyFavourites.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [addFavourite.rejected || deleteFavourite.rejected || getMyFavourites.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const favouriteReducer = favouriteSlice.reducer
