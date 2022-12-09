import {makeStyles} from "@material-ui/core/styles";

export const customStyle = makeStyles({
    messageLeft: {
        backgroundColor: "#7191F3",
        margin: 8,
        width: 400
    },
    messageRight: {
        backgroundColor: "#D2D5C4",
        margin: 8,
        textAlign: 'right',
        display:"flex",
        justifyContent:"right",
        width: 400
    },
    textMessage: {
        margin: 3
    },
    dateMessage: {
        margin:3,
        display: "flex",
        textAlign: "right",
    },
    emailMessage: {
        margin:3,
        display: "flex",
        justifyContent: "flex-start"
    },
})
