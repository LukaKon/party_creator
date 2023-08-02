import React from "react"

import { addView } from "../../redux/slices/ViewsSlice";

export const addViewFunction = (props) => {
    const announcementID = props.announcementID
    const data = {
        uuid: sessionStorage.getItem("uuid"),
        announcement: announcementID,
    }
    props.dispatch(addView(data))
}
