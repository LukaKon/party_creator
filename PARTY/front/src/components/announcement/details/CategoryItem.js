import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";

export const CategoryItem = (props) => {
  const { uuid, get_name } = props;

  return (
    <Link key={uuid} to={`/categories/${get_name}`} state={{ categoryUuid: uuid }}>
      <ListItem>
        <ListItemText primary={get_name} />
      </ListItem>
    </Link>
  );
};

CategoryItem.propTypes = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  get_name: PropTypes.string,
};
