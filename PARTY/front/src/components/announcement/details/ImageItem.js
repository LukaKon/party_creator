import { Link } from "react-router-dom";

export const ImageItem = (props) => {
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
    <Link to={props.image} underline="none">
      <ImageListItem key={props.uuid} sx={props.is_main === true ? styleIsMain : styleDefault}>
        <img
          src={`${props.image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${props.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt="description - make it dynamic"
          loading="lazy"
        />
      </ImageListItem>
    </Link>
  );
};
