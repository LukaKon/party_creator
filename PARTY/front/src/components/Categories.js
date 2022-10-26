import React, {useEffect} from "react";
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
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

    if(entities.loading){
        categoriesView = <AnnouncementSkeleton/>
    }else{
        categoriesView = (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {entities.categories.map(category => {
                    return(
                        <Link key={category.uuid} to={category.get_name} state={{ categoryUuid: category.uuid }} >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhotoIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            <ListItemText 
                            primary={category.get_name} 
                            secondary={`Znajdź coś dla siebie w kategorii ${category.get_name}` }/>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        )
    }


    return(
        <Grid>
        {categoriesView}
        </Grid>
    )
}