import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";

export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (data) => {
        try {
            const response = await axiosInstance.post("account/getprofile/", data);
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
                state.loading = false
            }
        }
    }
)

export const profileReducer = profileSlice.reducer
