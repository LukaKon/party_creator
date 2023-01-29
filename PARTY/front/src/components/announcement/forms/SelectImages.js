import { Grid } from "@mui/material";

export const SelectImages = (props) => {
  const { addImagesToList } = props;
  const [selectedImages, setSelectedImages] = useState([]);

  const imageHandler = (e) => {
    if (typeof addImagesToList === "function") {
      if (e.target.files[0]) {
        const fileArray = Array.from(e.target.files).map((file, index) => {
          if (index === 0) {
            const firstImage = {
              toShow: URL.createObjectURL(file),
              image: file,
              is_main: true,
            };
            return firstImage;
          }
          const otherImage = {
            toShow: URL.createObjectURL(file),
            image: file,
            is_main: false,
          };
          return otherImage;
        });

        setSelectedImages(fileArray);
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
