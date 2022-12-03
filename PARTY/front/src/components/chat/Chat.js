import React, {useEffect, useState} from "react"
import {Grid} from "@mui/material";
import {w3cwebsocket as W3CWebSocket} from "websocket"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const token = sessionStorage.getItem('access_token')
console.log(token)
const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/?token=' + token)
// const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/')

export const Chat = () => {
    const [messages, setMessages] = useState([])

    client.onmessage = (message) => {
        const newMessage = JSON.parse(message.data)
        console.log(newMessage.message)
        setMessages((prevState) => [...prevState, newMessage.message]
        )
    }

    let corpusMessages

    if(messages.length > 0){
        corpusMessages = (
            <Grid>
                {messages.map((oneMessage)=>{
                    return (<Typography component="h5">{oneMessage}</Typography>)
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
