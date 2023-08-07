import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { AnnouncementList } from "../announcement/AnnouncementList";
import { useDispatch, useSelector } from "react-redux";

import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
import { AnnouncementSkeleton } from "../skeletons/AnnouncementSkeletons";

const LOCALHOST = import.meta.env.LOCALHOST

export const HomePage = () => {
  const { loading, entities, error } = useSelector(
    (state) => state.announcements
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements({ main_page: true }));
  }, []);

  let content = <AnnouncementSkeleton />;
  if (!loading) {
    content = (
      <AnnouncementList loading={loading} entities={entities} error={error} />
    );
  }

  return (
    <Grid>
      <Grid>
        <img width={1240} alt="logo" src={LOCALHOST + "/media/main.png"} />
      </Grid>
      {content}
    </Grid>
  );
};
