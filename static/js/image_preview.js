const inputFile = document.querySelector('#images');
const mainDiv = document.querySelector('#img-num')
const previewContainer = document.querySelector('#imgPreview');

inputFile.addEventListener('change', function () {
    previewContainer.innerHTML = '';

    const files = this.files;
    if (files.length > 0) {
        files_arr = Array.from(files)

        // number of selected pictures
        // const div = document.createElement('div');
        // div.className = 'col';
        // const imgNumber = document.createElement('h3');
        // imgNumber.textContent = `Dodano ${files_arr.length} plików.`;


        // div.appendChild(imgNumber);
        // previewContainer.appendChild(div);

        const index_from_template = JSON.parse(document.querySelector('#counter').textContent)
        console.log('index form html: ', typeof (index_from_template));
        if (index_from_template === null) {
            index_from_template = 0;
        }

        files_arr.forEach((file, index = index_from_template) => {
            if (file) {
                console.log('file: ', file);
                const reader = new FileReader();

                reader.addEventListener('load', function () {

                    const addImage = document.createElement('div');
                    addImage.className = 'col';

                    console.log('index in for loop: ', index);
                    // radio selector to chose main image
                    const radioSelector = document.createElement('input');
                    radioSelector.setAttribute('type', 'radio')
                    radioSelector.setAttribute('name', 'main_image');
                    radioSelector.setAttribute('id', index);
                    radioSelector.setAttribute('value', index);
                    console.log('index: ', index);
                    if (index_from_template===0 && index===0){
                        radioSelector.setAttribute('checked','checked');
                    }
                    // end radio selector to chose main image


                    // image preview
                    // label
                    const radioLabel = document.createElement('label')
                    radioLabel.setAttribute('for', index);

                    const img = document.createElement('img');
                    img.className = 'image-preview__image';
                    img.setAttribute('src', this.result);
                    // img.setAttribute('src', reader.result);

                    const imgName = document.createElement('p');
                    imgName.innerText = file.name;

                    radioLabel.appendChild(img);
                    radioLabel.appendChild(imgName);
                    // end label

                    addImage.appendChild(radioSelector);
                    addImage.appendChild(radioLabel);

                    previewContainer.appendChild(addImage);
                })
                reader.readAsDataURL(file);
            } else {
                const emptyText = document.createElement('div');
                emptyText.className = 'col';
                emptyText.innerText = 'Nie wybrano zdjęć.';

                previewContainer.appendChild(emptyText)
            };
        });
    } else {
        const emptyField = document.createElement('div');
        emptyField.className = 'col';
        emptyField.innerHTML = ''

        const h3 = document.createElement('h3');
        h3.innerText = 'Nie wybrano jeszcze zdjęć';

        emptyField.appendChild(h3);
        previewContainer.appendChild(emptyField);
    };
});