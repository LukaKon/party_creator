import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Profile } from "./Profile";
import { TestApi } from "./testAPI";
import { AddAnnouncement } from "./announcement/AddAnnouncement";
import { AnnouncementDetails } from "./announcement/AnnouncementDetails";

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="example" element={<div>example</div>} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="testapi" element={<TestApi />} />
                    <Route
                        path="addannouncement"
                        element={<AddAnnouncement />}
                    />
                    <Route
                        path=":slug"
                        // path="xyz"
                        // path="announcement/xyz"
                        // path="announcements/:slug"
                        element={<AnnouncementDetails />}
                    />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
