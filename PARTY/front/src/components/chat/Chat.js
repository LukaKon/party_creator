import React, {useEffect, useState} from "react"
import {Grid} from "@mui/material";
import {w3cwebsocket as W3CWebSocket} from "websocket"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useLocation, useParams} from "react-router-dom";


export const Chat = (props) => {
    const location = useLocation();
    console.log('user id', location.state.to_user)
    const [messages, setMessages] = useState([])
    const [client, setClient] = useState({})
    
    const to_user = location.state.to_user
    useEffect(()=> {
        const token = localStorage.getItem('access_token')
        const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${to_user}/?token=` + token)
        setClient(client)
    },[])

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
        corpusMessages = (
            <Grid>
                {messages.map((fullMessage)=>{
                    return (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    {fullMessage.user}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    {fullMessage.datetime}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    {fullMessage.message}
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>)
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
