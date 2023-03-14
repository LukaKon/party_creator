import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

export const SelectImages = (props) => {
  const { listOfImages, addImagesToList } = props;
  const [selectedImages, setSelectedImages] = useState(listOfImages);

  const imageHandler = (e) => {
    if (typeof addImagesToList === "function") {
      let there_is_already_main_image = listOfImages.some((img) => img.is_main === true);
      if (e.target.files[0]) {
        if (there_is_already_main_image) {
          const fileArray = Array.from(e.target.files).map((file) => ({
            link: URL.createObjectURL(file),
            blob: file,
            is_main: false,
            to_delete: false,
          }));
          setSelectedImages([...listOfImages, ...fileArray]);
        } else {
          const fileArray = Array.from(e.target.files).map((file, index) => {
            if (index === 0) {
              const firstImage = {
                link: URL.createObjectURL(file),
                blob: file,
                is_main: true,
                to_delete: false,
              };
              return firstImage;
            }
            const otherImage = {
              link: URL.createObjectURL(file),
              blob: file,
              is_main: false,
              to_delete: false,
            };
            return otherImage;
          });

          // console.log("listOfImages: ", listOfImages, "fileArray: ", fileArray);

          setSelectedImages([...listOfImages, ...fileArray]);
        }
      }
    }
  };

  useEffect(() => {
    addImagesToList(selectedImages);
  }, [selectedImages]);

  return (
    <Grid>
      <input type="file" multiple id="file" accept="image/jpeg,image/png" onChange={imageHandler} />
    </Grid>
  );
};
