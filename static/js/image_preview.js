const inputFile=document.querySelector('#images');
const previewContainer=document.querySelector('#imgPreview');
const previewImage=previewContainer.querySelector('.image-preview__image');
const previewDefaultText=previewContainer.querySelector('.image-preview__default-text');

inputFile.addEventListener('change',function(){
    const files=this.files;
    files_arr=Array.from(files)
    console.log(files)
    files_arr.forEach((key, value) => {
        console.log(key,value)
// https://youtu.be/VElnT8EoEEM
    });
})

