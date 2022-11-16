import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {searchAnnouncement} from "../redux/slices/announcementSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


export const SearchBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [searchOptions, setSearchOptions] = useState([])

    useEffect(()=>{
        dispatch(searchAnnouncement({search: searchValue, submit: false}))
    },[])

    useEffect(()=>{
        if(!loading && searchValue.length > 2){
            setSearchOptions([])
            dispatch(searchAnnouncement({search: searchValue, submit: false}))
            announcementsFound.map(announcement=>setSearchOptions(oldState=>[...oldState, announcement.title]))
        }else{
            setSearchOptions([])
        }
        },[searchValue])

    const {loading, announcementsFound, error} = useSelector(state => state.announcements);

    const setValue = (event, value) => {
        if(value) {
            setSearchValue(value)
        }else{
            setSearchValue('')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(searchValue.length > 2){
            dispatch(searchAnnouncement({search: searchValue, submit: true}))
            navigate('/search')
        }else{
            console.log('Fraza Wyszukiwania musi mieć więcej niz 3 znaki')
        }

    }

    return (
        <Grid>
            <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            >
                <Grid sx={{width:900}} container direction="column" item>

                <Grid item xs={6}>

                    <Autocomplete
                  sx={{width:200}}
                  freeSolo
                  options={searchOptions}
                  renderInput={(params) => (
                       <Search>
                          <TextField {...params} placeholder={"Search"}/>
                       </Search>
                  )}
                  size={"small"}
                  value={searchValue}
                  onInputChange={(event, value)=> setValue(event, value)}
                  onChange={(event, value) => setValue(event, value)}
                />

                </Grid>

                <Grid item xs={6}>
                    TEST
                </Grid>

                </Grid>
            </Box>
        </Grid>)

}
