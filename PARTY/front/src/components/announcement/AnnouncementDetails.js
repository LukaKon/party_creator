import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";

// https://youtu.be/dCbfOZurCQk

export const AnnouncementDetails = () => {
    const { slug } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        // axiosInstance.get(slug).then(res=>)...
        dispatchEvent(fetchAnnouncementDetails(slug));
    }, [setData]);
    console.log("slug: ", slug);
    return <div>TODO: announcement details</div>;
};
