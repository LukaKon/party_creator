import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";

export const CategoryItem = (props) => {
  console.log("props in CategoryItem: ", props);
  const { uuid, get_name } = props;

  return (
    <Link key={uuid} to={`/categories/${get_name}`} state={{ categoryUuid: uuid }}>
      <ListItem>
        <ListItemText primary={get_name} />
      </ListItem>
    </Link>
  );
};
