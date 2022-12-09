// import {logoutProfile} from "../redux/slices/profileSlice";
// import {useDispatch, useSelector} from "react-redux";
// import {useEffect} from "react";
//
// export const logout = () => {
//     const dispatch = useDispatch()
//     useEffect(()=> {
//         dispatch(logoutProfile())
//     },[]);
//     const {loading, entities, error} = useSelector(state => state.profile)
//     if(!loading && entities === "initial"){
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.reload();
//         window.location.replace("/");
//     }
// }

// TODO - przy faktoryzacji będzie trzeba zrobić funkcje, które będą pobierane z tego pliku