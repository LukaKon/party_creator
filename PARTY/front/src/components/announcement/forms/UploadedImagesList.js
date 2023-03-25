import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";

export const UploadedImagesList = (props) => {
  const { listOfSelectedImages, updateListOfImages } = props;

  const deleteImage = (image) => {
    // const filteredImages = listOfSelectedImages.filter((img) => {
    //   return image.link !== img.link;
    // });
    const filteredListOfImages = listOfSelectedImages.map((img) => {
      if (image.link === img.link) {
        return { ...img, to_delete: true };
      }
      return img;
    });
    updateListOfImages(filteredListOfImages);
  };

  const toggleIsMainImage = (image) => {
    const updatedListOfImages = listOfSelectedImages.map((img) => {
      if (img.link === image.link) {
        return { ...img, is_main: true };
      } else {
        return { ...img, is_main: false };
      }
    });
    updateListOfImages(updatedListOfImages);
  };

  return (
    <Grid container spacing={3}>
      <ImageList sx={{ width: 800, height: 250 }} cols={3} rowHeight={100}>
        {listOfSelectedImages.map((image, index) =>
          image.to_delete ? null : (
            <Grid container item direction="row" key={index}>
              <Grid item xs={8}>
                <ImageListItem sx={{ width: 100, height: 100, objectFit: "contain" }}>
                  <img
                    src={image.link}
                    name={image.link}
                    alt={image.link}
                    is_main={image.is_main.toString()}
                    loading="lazy"
                  />
                </ImageListItem>
              </Grid>
              <Grid item xs={4}>
                {image.is_main.toString() === "false" ? (
                  <Button
                    startIcon={<Checkbox />}
                    onClick={() => toggleIsMainImage(image)}
                  ></Button>
                ) : (
                  <Button
                    startIcon={<CheckBoxIcon defaultChecked />}
                    onClick={() => toggleIsMainImage(image)}
                  ></Button>
                )}
                <Button
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => deleteImage(image)}
                ></Button>
              </Grid>
            </Grid>
          ),
        )}
      </ImageList>
    </Grid>
  );
};
