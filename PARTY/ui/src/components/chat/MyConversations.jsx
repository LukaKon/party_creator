import React, { useEffect } from "react"
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from '../../redux/slices/messageSlice'
import { ChatConversationPaper } from './ChatConversationPaper'


export const MyConversations = () => {
  const dispatch = useDispatch()
  const {
    loading: loadingProfile,
    entities: entitiesProfile,
  } = useSelector(state => state.profile)

  const {
    loading: loadingConversation,
    entities: entitiesConversation,
  } = useSelector(state => state.message)

  useEffect(() => {
    if (
      loadingProfile !== 'initial'
      && entitiesProfile !== "initial"
    ) {
      dispatch(fetchConversation({
        sender_id: entitiesProfile.id,
      }))
    }
  }, [entitiesProfile])

  let content

  if (!loadingConversation) {
    content = (
      entitiesConversation.map(conversation => {
        return (
          <ChatConversationPaper
            key={conversation.id}
            conversation={conversation}
            // announcement={conversation.announcement}
            // lastMessage={conversation.message[conversation.message.length - 1]}
            user={entitiesProfile}
          />
        )
      })
    )
  }

  return (
    <Grid value={content} />
  )
}
