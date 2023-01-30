import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axios";
import {loged} from "../../utils/loged";

export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (data, {rejectWithValue}) => {
        if(loged){
            try {
            const response = await axiosInstance.post("account/getprofile/", data);
            return response.data;
            } catch (error) {
                console.log("Fetch profile error: ", error.message);
                // throw error
                return rejectWithValue(error.response.data)
            }
        }
    }
);

export const logoutProfile = createAsyncThunk(
    "profile/logout",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("account/logout/");
            return response.data
        } catch(error){
            console.log("Problem with logout: ", error.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.patch("account/updateprofile/", data);
            return response.data;
        } catch (error) {
            console.log("Update problem: ", error.message);
            return rejectWithValue(error.response.data)
        }
    }
);

export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put('account/changepassword/', data)
            return response.data;
        }catch (error){
            console.log("Change password problem: ", error.message);
            return rejectWithValue(error.response.data)
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
            console.log("Creating account error: ", error.message)
            throw error;
        }
    }
);


export const handleEmail = createAsyncThunk(
    "profile/handleEmail",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("account/handleemail/", data);
            return response.data;
        } catch (error) {
            console.log("Activation problem: ", error.message);
            return rejectWithValue(error.response.data);
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
                state.error = action
                state.loading = false
            },
            [logoutProfile.pending]: (state) => {
                state.loading = true
            },
            [logoutProfile.fulfilled]: (state, action) => {
                state.loading = false
                state.entities = 'initial'
            },
            [logoutProfile.rejected]: (state, action) => {
                state.loading = false
                state.error = action.payload
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
                state.active = 'rejected'
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
);

export const profileReducer = profileSlice.reducer;
