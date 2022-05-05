import React, {useEffect} from 'react'
import {axiosInstance} from "../axios";



export const SignOut = () => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')

    useEffect({
        
    })
    axiosInstance.post('account/logout/')

    return(
        <div>
            Logged out.
        </div>
    )
}
