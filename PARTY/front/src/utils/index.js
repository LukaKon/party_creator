import {axiosInstance} from "../axios";


export const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    axiosInstance.post('account/logout/')
        .then(response => console.log(response))
    window.location.reload();
}

// TODO - przy faktoryzacji będzie trzeba zrobić funkcje, które będą pobierane z tego pliku