import React from 'react';
import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";


export const AnnouncementsByCategory = () => {
    let {category} = useParams();
    return(
        <Typography>
            tesst
            {category}
        </Typography>
    )
}