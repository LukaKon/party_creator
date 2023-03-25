import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ImageListItem } from "@mui/material";

export const ImageItem = (props) => {
  const { image, uuid, is_main } = props;

  const styleIsMain = {
    padding: 1,
    border: 3,
    borderColor: "lightgreen",
    width: 100,
    height: 100,
  };
  const styleDefault = {
    padding: 1,
    border: 3,
    borderColor: "lightred",
    width: 120,
    height: 120,
  };

  return (
    <Link to={image} underline="none">
      <ImageListItem key={uuid} sx={is_main === true ? styleIsMain : styleDefault}>
        <img
          src={`${image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt="description - make it dynamic"
          loading="lazy"
        />
      </ImageListItem>
    </Link>
  );
};

ImageItem.propTypes = {
  image: PropTypes.string,
  uuid: PropTypes.string,
  is_main: PropTypes.bool,
};
