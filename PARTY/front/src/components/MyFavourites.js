import React, {useEffect} from 'react'
import {Grid} from "@mui/material";
import {AnnouncementList} from "./announcement/AnnouncementList";
import {useDispatch, useSelector} from "react-redux";
import {getMyFavourites} from "../redux/slices/favouriteSlice";

export const MyFavourites = () =>{
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getMyFavourites())
    },[])

    let {loading, entities, error} = useSelector(state => state.favourite)
    let xyz = []
    let content

    if(!loading){
        entities.map(favourite=>{
            xyz.push(...favourite.announcement)
        })
        content = <AnnouncementList key={entities.id} loading={loading} entities={xyz} error={error}/>
    }


    return(
        <Grid sx={{padding: 1}}>
            {content}
        </Grid>
    )
}