import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";
import {loged} from "../../utils/loged";

export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (data) => {
        if(loged){
            try {
            const response = await axiosInstance.post("account/getprofile/", data);
            return response.data;
            } catch (err) {
                console.log("Fetch profile error: ", err.message);
            }
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile/",
    async (data) => {
        try {
            const response = await axiosInstance.patch("account/updateprofile/", data);
            return response.data;
        } catch (err) {
            console.log("Fetch profile error: ", err.message);
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
            [fetchProfile.pending]: (state) =>{
                state.loading = true
            },
            [fetchProfile.fulfilled]: (state, action)=>{
                state.loading = false
                state.entities = action.payload
            },
            [fetchProfile.rejected]: (state, action)=> {
                state.error = action.payload
                state.loading = false
            },
            [updateProfile.pending]: (state) =>{
                state.loading = true
            },
            [updateProfile.fulfilled]: (state, action)=>{
                state.loading = false
                state.entities = action.payload
            },
            [updateProfile.rejected]: (state, action)=> {
                state.error = action.payload
                state.loading = false
            },
        }
    }
)

export const profileReducer = profileSlice.reducer
