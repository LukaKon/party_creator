import React, {useEffect, useState} from 'react';
import {Box, Button, Grid} from "@mui/material";
import {TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {searchAnnouncement} from "../redux/slices/announcementSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const SearchBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [searchOptions, setSearchOptions] = useState([])

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

    const setValue = (event) => {
        if(event.target.value) {
            setSearchValue(event.target.value)
        }else{
            setSearchValue('')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(searchValue.length > 3){
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

                <Autocomplete
                  sx={{width:200}}
                  freeSolo
                  options={searchOptions}
                  renderInput={(params) => <TextField {...params} label="Search" />}
                  value={searchValue}
                  onInputChange={setValue}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                >
                    Search
                </Button>
            </Box>
        </Grid>)

}
