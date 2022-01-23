import React from "react";

function AnnouncementLoading(Component) {
  return function AnnouncementLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return <p style={{ fontSize: "25px" }}>Waiting for data...</p>;
  };
}

export default AnnouncementLoading;
