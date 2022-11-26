import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";
import {loged} from "../../utils/loged";

export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (data) => {
        if(loged){
            try {
            const response = await axiosInstance.post("account/getprofile/", data);
            return response.data;
            } catch (error) {
                console.log("Fetch profile error: ", error.message);
                throw error
            }
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (data) => {
        try {
            const response = await axiosInstance.patch("account/updateprofile/", data);
            return response.data;
        } catch (error) {
            console.log("Fetch profile error: ", error.message);
            throw error
        }
    }
);


export const createProfile = createAsyncThunk(
    "profile/create",
    async(data) => {
        try {
            const response = await axiosInstance.post('account/register/', data);
            return response.data;
        }catch (error) {
            console.log("Creating account error: ", error)
            throw error
        }
    }
)

export const handleEmail = createAsyncThunk(
    "profile/activate",
    async(data) => {
        try{
            const response = await axiosInstance.post('account/handleemail/', data);
            return response.data;
        } catch (error){
            console.log("Activation problem: ", error.message);
            throw error
        }
    }
);


const profileSlice = createSlice({
        name: "profile",
        initialState: {
            loading: true,
            entities: "initial",
            error: null,
        },
        reducers: {},
        extraReducers:{
            [fetchProfile.pending || updateProfile.pending]: (state) =>{
                state.loading = true
            },
            [fetchProfile.fulfilled || updateProfile.fulfilled]: (state, action)=>{
                state.loading = false
                state.entities = action.payload
            },
            [fetchProfile.rejected || updateProfile.rejected]: (state, action)=> {
                state.error = action.payload
                state.loading = false
            },
            [handleEmail.pending]: (state) => {
                state.loading = true
                state.active = false
            },
            [handleEmail.fulfilled]: (state) =>{
                state.loading = false
                state.active = true
            },
            [handleEmail.rejected]: (state, action) => {
                state.loading = false
                state.active = false
                state.error = action.payload
            },
            [createProfile.pending]: (state) => {
                state.loading = true
            },
            [createProfile.fulfilled]: (state) => {
                state.loading = false
                state.created = true
            },
            [createProfile.rejected]: (state, action) => {
                state.loading = false
                state.error = true
            }
        }
    }
)

export const profileReducer = profileSlice.reducer
