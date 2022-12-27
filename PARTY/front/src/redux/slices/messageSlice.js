import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loged} from "../../utils/loged";
import {axiosInstance} from "../../axios";

export const fetchMessage = createAsyncThunk(
    "chat/getMessage",
    async(data, {rejectWithValue})=>{
        if(loged){
            try{
                const response = await axiosInstance.post("/chatapi/getmessage/", data);
                return response.data
            }catch (error){
                console.log("Getting messages problem: ", error.message);
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const fetchConversation = createAsyncThunk(
    "chat/getConversation",
    async(data, {rejectWithValue}) => {
        if(loged){
            try {
                const response = await axiosInstance.post("/chatapi/getconversation/", data)
                return response.data
            }catch (error){
                console.log("Getting conversation problem: ", error.message)
                return rejectWithValue(error.response.data)
            }
        }
    }
);

export const createVoiceMessage = createAsyncThunk(
    "chat/createVoiceMessage",
    async(data, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("/chatapi/createvoicemessage/", data)
            return response.data
        }catch (error){
            console.log("Creating voice message problem: ", error.message)
            return rejectWithValue(error.message)
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState: {
        loading: true,
        entities: "initial",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchMessage.pending]: (state) => {
            state.loading = true
        },
        [fetchMessage.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [fetchMessage.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [fetchConversation.pending]: (state) => {
            state.loading = true
        },
        [fetchConversation.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [fetchConversation.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.entities = "initial"
        },
        // [createVoiceMessage.pending]: (state) => {
        //     state.loading = true
        // },
        // [createVoiceMessage.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.entities = action.payload
        // },
        // [createVoiceMessage.rejected]: (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // },
    }
});

export const messageReducer = messageSlice.reducer;
