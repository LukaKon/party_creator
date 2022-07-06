import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios";

// https://youtu.be/dCbfOZurCQk

export const AnnouncementDetails = () => {
    const { slug } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        // axiosInstance.get(slug).then(res=>)...
    }, [setData]);
    return <div>TODO: announcement details</div>;
};
