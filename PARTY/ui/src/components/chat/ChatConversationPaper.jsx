import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

// const LOCALHOST = process.env.REACT_LOCALHOST;
const LOCALHOST = 'http://127.0.0.1:8000'

export const ChatConversationPaper = (props) => {
  const conversation = props.conversation
  const announcement = conversation.announcement
  const lastMessage = conversation.message[conversation.message.length - 1]
  const userEmail = props.user.email
  const userID = props.user.id
  let second_interlocutor
  let imageSrc
  let recipientID = conversation.recipient
  let senderID
  const navigate = useNavigate();

  if (conversation.recipient !== userID) {
    senderID = conversation.recipient
    console.log('user_id', userID)
    console.log('recipient_id in chatpaper', recipientID)
  } else {
    recipientID = conversation.sender
    console.log('recipient_id in chatpaper else', recipientID)

  }


  if (lastMessage.sender === userEmail) {
    second_interlocutor = lastMessage.recipient
  } else {
    second_interlocutor = lastMessage.sender
  }

  if (announcement.images.length === 1) {
    imageSrc = LOCALHOST.slice(0, -1) + announcement.images[0].image
    console.log(announcement.images[0].image)
  } else {
    imageSrc = LOCALHOST + "media/announcement/defaultAnnouncement.jpg";
  }

  const openChat = () => {
    navigate("/chat/", {
      state: {
        sellerID: conversation.seller,
        customerID: conversation.customer,
        announcementID: announcement.id
      }
    })
  }

  return (
    <Paper elevation={24} sx={{ height: 80 }} onClick={() => openChat()}>
      <Grid container>
        <Grid item xs={12}>
          {second_interlocutor}
        </Grid>

        <Grid item xs={2}>
          <Avatar alt="main image" src={imageSrc} sx={{ height: 50 }}></Avatar>
        </Grid>

        <Grid item xs={10}>
          {lastMessage.message}
        </Grid>
      </Grid>

    </Paper>
  )
}
