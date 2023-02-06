import React, {useEffect} from "react"
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchConversation} from "../../redux/slices/messageSlice";
import {fetchProfile} from "../../redux/slices/profileSlice";


export const MyConversations = () => {
    const dispatch = useDispatch()
    const {
        loading: loadingProfile,
        entities: entitiesProfile,
        error: errorProfile
    } = useSelector(state => state.profile)

    useEffect(() => {
        console.log('tam',
            loadingProfile, entitiesProfile
        )
        if(
            loadingProfile === 'initial'
            && entitiesProfile === "initial"
        ){
            dispatch(fetchProfile()).unwrap()
                .then((response) => {
                    dispatch(fetchConversation({
                        sender_id: response.id,
                        recipient_id: response.id
                    }))
                })
        }
    },[])

    return (
        <Grid>

        </Grid>
    )
}
