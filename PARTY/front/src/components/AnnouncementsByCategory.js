import React from 'react';
import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {axiosInstance} from "../axios";

export const AnnouncementsByCategory = () => {
    let {categoryName} = useParams();
    let categoryUuid
    let announcementsByCategory
    let viewAnnouncements
    const entities = useSelector((state)=> state.categories);

    entities.categories.map(category=>{
        if(category.name===categoryName){
            categoryUuid = category.uuid
        }
    })

    axiosInstance.get("api/announcements/?category="+categoryUuid)
        .then((response)=>{
            announcementsByCategory = response.data
            console.log(announcementsByCategory)
        })

    if(announcementsByCategory){
        viewAnnouncements=(
                <Typography>
                    {announcementsByCategory.map(announcement=>{
                        return announcement.title
                        }
                    )}
                </Typography>)
    }else{
        viewAnnouncements=(<Typography>TEST</Typography>)
    }

    return(
        <Typography>
            Nazwa kategori: {categoryName}
            <Typography> Uuid kategori: {categoryUuid}</Typography>
            {viewAnnouncements}
        </Typography>

    )
}