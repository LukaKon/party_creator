import React, {useEffect, useState} from "react"
import {Grid} from "@mui/material";
import {w3cwebsocket as W3CWebSocket} from "websocket"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {fetchMessage} from "../../redux/slices/messageSlice";
import {customStyle} from "../../styles/customStyle";
import {fetchProfile} from "../../redux/slices/profileSlice";


export const Chat = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([])
    const [client, setClient] = useState({})
    const dispatch = useDispatch()
    const recipient = location.state.to_user
    const classes = customStyle();
    const {loading: loadingProfile, entities: entitiesProfile, error: errorProfile} = useSelector(state => state.profile)

    useEffect(()=> {
        // Fetch profile if it isn't already in state because i want it to compare emails.
        if(!loadingProfile && entitiesProfile === "initial"){
            dispatch(fetchProfile())
        }
        dispatch(fetchMessage({recipient: recipient}))
        const token = localStorage.getItem('access_token')
        const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${recipient}/?token=` + token)
        setClient(client)
    },[])

    const {loading, entities, error} = useSelector(state => state.message)

    const handleMessage = (senderEmail) => {
        let style
        if (senderEmail === entitiesProfile.email){
            return classes.messageRight
        }else{
            return classes.messageLeft
        }
    }

    let historyMessages
    if(!loading && !loadingProfile && entities.length > 0){
        // Fetched messages (chat history)
        historyMessages = (
            entities.map((message)=>{
                const datetime = new Date(message.created).toLocaleString()
                const style = handleMessage(message.sender)

                return(
                    <Paper className={style}>
                         <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="caption">
                                    {message.sender}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption">
                                    {datetime}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    {message.message}
                                </Typography>
                            </Grid>
                         </Grid>
                    </Paper>
                )
                })
        )
    }

    client.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const fullMessage = {
            "message": data.message,
            "datetime": data.datetime,
            "user": data.user
        }

        setMessages((prevState) => [...prevState, fullMessage])
    }

    let corpusMessages

    if(messages.length > 0){
        // Messages sent in this session
         if(!loadingProfile) {
             corpusMessages = (
                 messages.map((message) => {
                     const datetime = new Date(message.datetime).toLocaleString()
                     const style = handleMessage(message.user)

                     return (
                         <Paper className={style}>
                             <Grid container>
                                 <Grid item xs={12}>
                                     <Typography variant="caption">
                                         {message.user}
                                     </Typography>
                                 </Grid>
                                 <Grid item xs={12}>
                                     <Typography variant="caption">
                                         {datetime}
                                     </Typography>
                                 </Grid>
                                 <Grid item xs={12}>
                                     <Typography variant="h6">
                                         {message.message}
                                     </Typography>
                                 </Grid>
                             </Grid>
                         </Paper>
                     )
                 })

             )
         }
    }

    const sendMessage = (event) => {
        event.preventDefault()
        let dataForm = new FormData(event.currentTarget)
        const messageFromForm = dataForm.get('message')
        console.log(messageFromForm)
        const data = JSON.stringify({message:messageFromForm})
        client.send(data)
    }


    return(
        <Grid>
            {historyMessages}
            {corpusMessages}
            <Box
            component='form'
            onSubmit={sendMessage}
            >
                <TextField
                    name="message"
                >

                </TextField>
                <Button variant={"outlined"} type={"submit"}>Send</Button>
            </Box>
        </Grid>
    )
}
