import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AudioMessage } from "./AudioMessage";
import { fetchConversation } from "../../redux/slices/messageSlice";
// import { customStyle } from "../../styles/customStyle";
import { fetchProfile } from "../../redux/slices/profileSlice";

// const WS = process.env.REACT_WS;
const WS = 'ws://127.0.0.1:8000'

export const Chat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState({});
  const dispatch = useDispatch();
  const sellerID = location.state.sellerID;
  const customerID = location.state.customerID;
  const announcementID = location.state.announcementID;
  // const classes = customStyle();
  const {
    loading: loadingProfile,
    entities: entitiesProfile,
    error: errorProfile,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    // Fetch profile if it isn't already in state because i want it to compare emails.
    if (!loadingProfile && entitiesProfile === "initial") {
      dispatch(fetchProfile());
    }
    dispatch(
      fetchConversation({
        announcement_id: announcementID,
        seller_id: sellerID,
        customer_id: customerID,
        type_fetch: "single_conversation",
      }),
    );
    const token = localStorage.getItem("access_token");
    const client = new W3CWebSocket(
      `${WS}/ws/chat/${sellerID}/${customerID}/${announcementID}/?token=` + token,
    );
    // const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${sellerID}/${customerID}/${announcementID}/?token=` + token)
    setClient(client);
  }, []);

  const { loading: loadingConversation, entities: entitiesConversation } = useSelector(
    (state) => state.message,
  );

  const checkStyleUser = (senderEmail) => {
    if (senderEmail === entitiesProfile.email) {
      // return classes.messageRight;
      console.log('right')
    } else {
      // return classes.messageLeft;
      console.log('left')
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    let dataForm = new FormData(event.currentTarget);
    const messageFromForm = dataForm.get("message");
    const data = JSON.stringify({ message: messageFromForm });
    client.send(data);
  };

  client.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const fullMessage = {
      typeMessage: data.type_message,
      message: data.message,
      datetime: data.datetime,
      user: data.user,
      uuid: data.uuid,
    };
    setMessages((prevState) => [...prevState, fullMessage]);
  };

  const paperMessage = (user, datetime, message, uuid, typeMessage = undefined) => {
    const datetime_string = new Date(datetime).toLocaleString();
    const style = checkStyleUser(user);
    let messageToShow;

    if (typeMessage === "voice_message" || typeof typeMessage === "number") {
      messageToShow = <audio controls src={message} />;
    } else {
      messageToShow = (
        <Typography 
          variant="h6"
          /* className={classes.textMessage} */
        >
          {message}
        </Typography>
      );
    }

    return (
      <Paper className={style} key={uuid}>
        <Grid container>
          <Grid item>
            <Typography
              variant="caption"
              /* className={classes.emailMessage} */
              >
              {user}
            </Typography>
          </Grid>
          <Grid item
              /* className={classes.dateMessage} */
              xs={12}>
            <Typography variant="caption" align="right">
              {datetime_string}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {messageToShow}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  let historyMessages;

  if (!loadingConversation && !loadingProfile && entitiesConversation !== "initial") {
    // Fetched messages (chat history)
    if (entitiesConversation.length === 0) {
      historyMessages = "";
    } else {
      historyMessages = entitiesConversation[0].message.map((message) => {
        return paperMessage(
          message.sender,
          message.created,
          message.message,
          message.uuid,
          message.voice_message,
        );
      });
    }
  }

  let sessionMessages;

  if (messages.length > 0) {
    // Messages sent in this session
    if (!loadingProfile) {
      sessionMessages = messages.map((message) => {
        return paperMessage(
          message.user,
          message.datetime,
          message.message,
          message.uuid,
          message.typeMessage,
        );
      });
    }
  }

  return (
    <Grid>
      {historyMessages}
      {sessionMessages}
      <Box component="form" onSubmit={sendMessage}>
        <TextField name="message"></TextField>
        <Button variant={"outlined"} type={"submit"}>
          Send
        </Button>
        <AudioMessage client={client} />
      </Box>
    </Grid>
  );
};
