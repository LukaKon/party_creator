import React, { useState } from "react";
import { useSelector } from "react-redux";

export const AnnouncementList = () => {
    const state = useSelector((state) => state.announcement);
    console.log("-----state: ", state);
    return <div>List of announcements.</div>;
};
