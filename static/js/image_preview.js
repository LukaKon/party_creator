// TODO: when upload new files do not remove old ones from preview
// TODO: update do not add pictures!!!


const inputFile = document.querySelector('#images');
const mainDiv = document.querySelector('#img-num')
const previewContainer = document.querySelector('#imgPreview');

inputFile.addEventListener('change', function () {
    const files = this.files;
    if (files) {
        files_arr = Array.from(files)

        // number of selected pictures
        const div = document.createElement('div');
        div.className = 'col';
        const imgNumber = document.createElement('h3');
        imgNumber.textContent = `Dodano ${files_arr.length} plików.`;

        div.appendChild(imgNumber);
        previewContainer.appendChild(div);

        files_arr.forEach((file) => {
            if (file) {
                // console.log('file:', file)

                const reader = new FileReader();
                // console.log('reader:', reader)

                reader.addEventListener('load', function () {
                    const addImage = document.createElement('div');
                    addImage.className = 'col';

                    const img = document.createElement('img');
                    img.className = 'image-preview__image';
                    img.setAttribute('src', this.result);
                    // img.setAttribute('src', reader.result);

                    const imgName = document.createElement('p')
                    imgName.innerText = file.name

                    addImage.appendChild(img);
                    addImage.appendChild(imgName);
                    previewContainer.appendChild(addImage);
                })
                reader.readAsDataURL(file);
            } else {
                console.log('brak zdjęć...')
            };
        });

    } else {
        console.log('brak zdjęć...')
        const emptyField = document.createElement('div');
        emptyField.className = 'col';

        const h3 = document.createElement('h3');
        h3.innerText = 'nie wybrano jeszcze zdjęć';

        emptyField.appendChild(h3);
        previewContainer.appendChild(emptyField);
    };
});