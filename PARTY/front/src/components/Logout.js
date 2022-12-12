import React from "react";
import {logoutProfile} from "../redux/slices/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const Logout = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(logoutProfile())
    },[]);
    const {loading, entities, error} = useSelector(state => state.profile)
    if(!loading && entities === "initial"){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
        window.location.replace("/");
    }
    return('')
}