export const ANNOUNCEMENT_FETCHING = "ANNOUNCEMENT_FETCHING";
export const ANNOUNCEMENT_FETCHED = "ANNOUNCEMENT_FETCHED";
export const ANNOUNCEMENT_ERROR = "ANNOUNCEMENT_ERROR";

export const announcementFetching = () => ({
    typeof: ANNOUNCEMENT_FETCHING,
});

export const announcementFetched = (payload) => ({
    typeof: ANNOUNCEMENT_FETCHED,
    payload,
});

export const announcementError = (payload) => ({
    typeof: ANNOUNCEMENT_ERROR,
    payload,
});

export const fetchAnnouncement = async (id) => (dispatch = {});
