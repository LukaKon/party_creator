import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchAnnouncements } from "../../features/announcement/announcementSlice";

export const AnnouncementList = () => {
    const { loading, entities, error } = useSelector(
        (state) => state.announcements
    );
    // console.log("-----entities: ", entities);
    const dispatch = useDispatch();

    // const loading = useSelector((state) => state.announcements.loading);
    // console.log("loading state: ", loading);

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, []);

    let content;
    if (loading) {
        content = <div>Fetching in progress...</div>;
    } else {
        content = (
            <div>
                <ul>
                    {entities.map((ann, index) => {
                        return <li key={index}>{ann.title}</li>;
                    })}
                </ul>
            </div>
        );
    }
    return (
        <div>
            List of announcements.
            <br />
            {content}
        </div>
    );
};

const mapState = ({ loading, announcements }) => ({
    loading,
    // announcement: announcementReducer.announcements.entities,
    announcements: ["ogłoszenie1", "ogłoszenie2"],
});

export const AnnouncementListContainer = connect(
    mapState
    // mapDispatch
)(AnnouncementList);
