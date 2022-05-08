import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { TestApi } from "./testAPI";
import { AddAnnouncement } from "./announcement/AddAnnouncement";
import {
    AnnouncementList,
    AnnouncementListContainer,
} from "./announcement/AnnouncementList";

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="example" element={<div>example</div>} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="testapi" element={<TestApi />} />
                    <Route path="announcement" element={<AddAnnouncement />} />
                </Routes>
                {/* <AnnouncementList /> */}
                <AnnouncementListContainer />
                <Footer />
            </BrowserRouter>
        </div>
    );
};
