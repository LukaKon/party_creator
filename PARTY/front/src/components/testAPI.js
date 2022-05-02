import React from 'react'
import { axiosInstance } from "../axios";
import {Button} from "@mui/material";

export const TestApi = () =>{

    const handleButton = (event) => {
        event.preventDefault()
        axiosInstance.get("account/testapi/").then(response=>console.log(response))
    }

    return(
        <div>
            <Button onClick={handleButton}>TEST API</Button>
        </div>
    )
}