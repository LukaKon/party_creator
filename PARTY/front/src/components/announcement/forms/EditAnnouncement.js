import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'

import {editAnnouncement,fetchAnnouncementDetails} from '../../../redux/slices/announcementDetailSlice'
import {loged} from '../../../utils/loged'


export const EditAnnouncement = () => {
  const {slug} = useParams()
  const dispatch = useDispatch()
  const { loading, entities, error } = useSelector(state=>state.announcementDetails)

  useEffect(()=>{
    dispatch(fetchAnnouncementDetails(slug))
  },[])
  console.log('in edit data: ', entities)

  return(
  <Grid>Edit annoucnement form
    </Grid>
  )
}
