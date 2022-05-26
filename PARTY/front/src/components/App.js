import React from "react";
import {Footer} from "./Footer";
import {Header} from "./Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./HomePage";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {Settings} from "./Settings";
import {Profile} from "./Profile";
import {TestApi} from "./testAPI";
import {AddAnnouncement} from "./announcement/AddAnnouncement";


export const App = () => {
    const isAuthenticated = sessionStorage.getItem('access_token')

    const isAuthenticatedFunction = (path, component) => {
        if (isAuthenticated) {
            return <Route path={path} element={component}/>
        } else {
            return <Route path={path} element={<SignIn/>}/>
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    {/*Views for all*/}

                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="testapi" element={<TestApi/>}/>
                    <Route path='*' element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>}/>

                    {/*Views only for logged users*/}
                    {isAuthenticatedFunction('profile', <Profile/>)}
                    {isAuthenticatedFunction('settings', <Settings/>)}
                    {isAuthenticatedFunction('addannouncement', <AddAnnouncement/>)}


                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
};
