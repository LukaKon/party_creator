import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";

export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (data) => {
        try {
            const response = await axiosInstance.post("account/getprofile/", data);
            return response.data;
        } catch (err) {
            console.log("thunk error: ", err.message);
        }
    }
);


const profileSlice = createSlice({
        name: "profile",
        initialState: {
            loading: "before",
            entities: 'test',
            error: null,
        },
        reducers: {},
        extraReducers:{
            [fetchProfile.pending]: (state) =>{
                state.loading = true
            },
            [fetchProfile.fulfilled]: (state, action)=>{
                state.loading = "after"
                state.entities = action.payload
            },
            [fetchProfile.rejected]: (state, action)=> {
                state.loading = "after"
            }
        }
    }
)

export const profileReducer = profileSlice.reducer
