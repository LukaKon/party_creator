import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {fetchAnnouncements} from "../redux/slices/announcementSlice";
import {useDispatch, useSelector} from "react-redux";

export const SearchBar = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [searchOptions, setSearchOptions] = useState([])

    useEffect(()=>{
        dispatch(fetchAnnouncements({search: searchValue}))
        console.log('test')
        if(!loading && searchValue.length > 3){
            console.log('searchOptions', searchOptions)
            entities.map(announcement=>setSearchOptions(oldState=>if[...oldState, announcement.title]))
        }
        },[searchValue])

    const {loading, entities, error} = useSelector(state => state.announcements);

    const setValue = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <Grid>
          <Autocomplete
              sx={{width:200}}
              freeSolo
              options={searchOptions}
              renderInput={(params) => <TextField {...params} label="Search" />}
              value={searchValue}
              onInputChange={setValue}
          />
        </Grid>)

}
