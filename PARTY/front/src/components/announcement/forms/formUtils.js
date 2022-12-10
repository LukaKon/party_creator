export const formIsValid = (args)=>{
  if(args){
  return true

  }
  return false
}
export const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (
      !enteredTitleIsValid &&
      !enteredDescriptionValid &&
      !selectedCategoryIsValid
    ) {
      return;
    }

    const formData = new FormData();

    // necessary data
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);
    formData.append("category", selectedCategory);

    // additional data
    if (listOfImages) {
      listOfImages.map((img) => {
        formData.append("images", img.image);
        formData.append(img.image.name, img.is_main);
      });
    }

    if (enteredMovieUrl) {
      formData.append("movies", enteredMovieUrl);
    }

    dispatch(createAnnouncement(formData));

    resetTitleInput();
    resetDescriptionInput();
    resetSelectedCategory();
    resetMovieUrl();
    setListOfImages("");
  };


