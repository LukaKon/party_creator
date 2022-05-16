import {axiosInstance} from "../axios";


export const handleButton = () => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
    axiosInstance.post('account/logout/')
        .then(response => console.log(response))
    window.location.reload();
}