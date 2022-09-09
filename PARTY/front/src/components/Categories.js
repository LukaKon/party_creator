import React, {useEffect} from "react";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../redux/slices/categorySlice";
import {AnnouncementSkeleton} from "./skeletons/AnnouncementSkeletons";
import {Link} from "react-router-dom"
import PhotoIcon from '@mui/icons-material/Photo';

export const Categories = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategories())
    },[])

    const entities = useSelector((state)=> state.categories);

    let categoriesView

    if(entities.categories.length > 0){
        categoriesView = (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {entities.categories.map(category => {
                    return(
                        <Link to={category.name}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhotoIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            <ListItemText primary={category.name} secondary={'testujemy'}/>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        )
    }else{
        categoriesView = AnnouncementSkeleton
    }


    return(
        <Typography>
        {categoriesView}
        </Typography>
    )
}