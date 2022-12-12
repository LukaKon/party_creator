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
        entities: [],
        error: null,
    },
    reducers: {},
    extraReducers:{
        [addFavourite.pending]: (state) => {
            state.loading = true
        },
        [addFavourite.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = [...state.entities, action.payload]
        },
        [addFavourite.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteFavourite.pending]: (state) => {
            state.loading = true
        },
        [deleteFavourite.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = state.entities.filter(favourite => {
                return favourite.id !== action.payload.id
            })
        },
        [deleteFavourite.rejected]: (state, action) => {
            state.loading = true
            state.error = action.payload
        },
        [getMyFavourites.pending]: (state) => {
            state.loading = true
        },
        [getMyFavourites.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [getMyFavourites.rejected]: (state, action) => {
            state.loading = true
            state.error = action.payload
        },

    }
})

export const favouriteReducer = favouriteSlice.reducer
