import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, deleteFavourite, getMyFavourites} from "../../redux/slices/favouriteSlice";
import {loged} from "../loged";
import {Checkbox, Grid} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export const FavouriteButton = (props) => {
  const dispatch = useDispatch();
  const [checkInput, setCheckInput] = useState(false)

  useEffect(()=>{
    if(loged){
      dispatch(getMyFavourites())
    }
  },[])

  const {loading, entities, error} = useSelector(state => state.favourite)

  useEffect(()=> {
    if(!loading && loged){
      entities.map(userFavouriteAnnouncement=> {
      if(userFavouriteAnnouncement.id === props.favourite[0]){
        setCheckInput(true)
      }
    })
    }
  },[entities])


  const addOrRemoveFavourite = (checkInput) => {
    if(checkInput){
      dispatch(deleteFavourite({"announcement": props.announcementID}))
      setCheckInput(false)
    }else{
      const data={
        "user" : [props.userID],
        "announcement" : [props.announcementID]
      }
      dispatch(addFavourite(data))
      setCheckInput(true)
    }
  }

  let content
  if (loged){
    content = (
          <Checkbox icon={<FavoriteBorder/>}
                    checkedIcon={<Favorite/>}
                    checked={checkInput}
                    onClick={()=>{addOrRemoveFavourite(checkInput)}}/>
       )
  }


  return (
      <Grid item xs={12}>
        {content}
      </Grid>
  )
}