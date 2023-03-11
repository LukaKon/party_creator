import React, {useState} from "react"
import {Button, Grid, IconButton} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import {useDispatch} from "react-redux";
import {createVoiceMessage} from "../../redux/slices/messageSlice";

export const AudioMessage = (props) => {
    const {client} = props
    const dispatch = useDispatch()
    const [mp3Settings, setMp3Settings] = useState(
        {
            blobURL: '',
            isBlocked: true,
            stream: null,
            rec: {},
        })

    const start = 'start';
    const stop = 'stop';

    const getMicrophonePermission = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
         setMp3Settings((prevState) => {
            return {
                ...prevState,
                isBlocked: false,
                stream: stream
            }
        })
        return stream
    }

    const sendMessage = (message) => {
        const data = new FormData()
        data.append("voice_message", message)
        dispatch(createVoiceMessage(data)).unwrap()
            .then((response) =>{
                console.log('response sent to consumer', response.voice_message)
                client.send(JSON.stringify({voice:response.voice_message}))
            }
    )}

    const handleRecording = async (start_or_stop) => {
        if(start_or_stop === start){
            if(mp3Settings.isBlocked) {
                const stream = await getMicrophonePermission()
                let rec = new MediaRecorder(stream)
                setMp3Settings(prevState => {
                    return {
                        ...prevState,
                        rec: rec
                    }
                })
                rec.start()
            } else {
                let rec = new MediaRecorder(mp3Settings.stream)
                rec.start()
                setMp3Settings(prevState => {
                    return {
                        ...prevState,
                        rec: rec
                    }
                })
            }
        }else{
            let audioChunks = []
            mp3Settings.rec.stop()
            mp3Settings.rec.ondataavailable = event => {
                audioChunks.push(event.data)
                const blob = new Blob(audioChunks, {type: 'audio/mpeg'});
                const blobURL = URL.createObjectURL(blob)
                setMp3Settings(prevState => {
                    return{
                        ...prevState,
                        blobURL: blobURL
                    }
                })
                sendMessage(blob)
            }
        }
    };


    return(
        <Grid>
            <IconButton aria-label="record" onClick={() => {handleRecording(start)}}>
                    <MicIcon/>
            </IconButton>
            <Button onClick={() => handleRecording(stop)}> STOP </Button>
            <Grid>
                <audio controls src={mp3Settings.blobURL}/>
            </Grid>
        </Grid>
    )
}