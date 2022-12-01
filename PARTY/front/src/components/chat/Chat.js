import React, {useEffect} from "react"
import {Grid} from "@mui/material";
import {w3cwebsocket as W3CWebSocket} from "websocket"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/')

export const Chat = () => {

    // client.onmessage = (message) => {
    //         const dataFromServer = JSON.parse(message.data);
    //         console.log(dataFromServer)
    //     client.send(JSON.stringify({message:'message'}))
    // }

    const sendMessage = (event) => {
        event.preventDefault()
        let dataForm = new FormData(event.currentTarget)
        const messageForm = dataForm.get('message')
        console.log(messageForm)
        const data = JSON.stringify({message:messageForm})
        client.send(data)
    }


    return(
        <Grid>
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
