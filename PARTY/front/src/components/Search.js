import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, MenuItem, Select} from "@mui/material";
import {TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {searchAnnouncement} from "../redux/slices/announcementSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';
import {fetchCategories} from "../redux/slices/categorySlice";

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
    const [category, setCategory] = useState(false)

    useEffect(()=>{
        dispatch(fetchCategories())
    },[])

    const announcements = useSelector(state => state.announcements);
    const categories = useSelector((state)=> state.categories)

    useEffect(()=>{
        if(!announcements.loading && searchValue.length > 2){
            setSearchOptions([])
            dispatch(searchAnnouncement({search: searchValue, submit: false, category: category}))
            announcements.announcementsFound.map(announcement=>setSearchOptions(oldState=>[...oldState, announcement.title]))
        }else{
            setSearchOptions([])
        }
        },[searchValue])

    let menuCategories

    if (!categories.loading){
        menuCategories=(
            categories.entities.map(category=>{
                return <MenuItem key={category.uuid} value={category.uuid}>{category.get_name}</MenuItem>
            })
        )}

    const setValue = (event, value) => {
        if(value) {
            setSearchValue(value)
        }else{
            setSearchValue('')
        }
    }

    const changeCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        if(searchValue.length > 2){
            dispatch(searchAnnouncement({search: searchValue, submit: true, category: category}))
            navigate('/search')
        }else{
            console.log('Fraza Wyszukiwania musi mieć więcej niz 3 znaki')
        }

    }

    return (
        <Grid>
                <Grid sx={{width:450}}
                      container
                      direction="row"
                      justifyContent={"flex-start"}
                >

                    <Grid item xs={6}>
                         <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            >
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
                         </Box>
                    </Grid>

                    <Grid item xs={5}>
                          <Select
                              sx={{width:150, height:40}}
                              id="category"
                              defaultValue={false}
                              onChange={changeCategory}
                          >
                              <MenuItem value={false}>All categories</MenuItem>
                              {menuCategories}

                          </Select>
                    </Grid>

                    <Grid item xs={1}>
                        <Button sx={{width:50, height:40}} variant="contained" onClick={handleSubmit}>
                          Search
                        </Button>
                    </Grid>

                </Grid>
        </Grid>)

}
