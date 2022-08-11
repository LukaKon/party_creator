import React, { useState } from "react";
import {
  ImageList,
  ImageListItem,
} from '@mui/material'
import {
  AddPhotoAlternateIcon,
  AddPhotoOutlined,
   }from '@mui/icons-material';

export const SelectImages = (props) => {

  const [selectedImages, setSelectedImages] = useState()

  const imageHandleChange = e => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))

      setSelectedImages(fileArray)
    }
  }

  let images
  if (selectedImages) {
    images = <UploadedImageList images={selectedImages} />
  } else {
    images = <p>Dodaj zdjęcia :)</p>
  }

  return (
    <>
      <input
        type='file'
        multiple
        id='file'
        onChange={imageHandleChange}
      />
      <div>
        <label htmlFor="file">
    // <svg data-testid='AddPhotoAlternateIcon'>ikona</svg>
    <AddPhotoOutlined />
          <i className="material-icons">add photos</i>
        </label>
      </div>
      {images}
    </>
  )

}

const UploadedImageList = ({ images }) => {
  // console.log('props', images)
  return (
    <ImageList sx={{ width: 400, height: 350 }} cols={3} rowHeight={164}>
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={image}
            // srcSet={}
            alt={image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
