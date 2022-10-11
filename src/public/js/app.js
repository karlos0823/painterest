
//Lógica subir imagen
const dropArea = document.querySelector('.drag-area');
const input = dropArea.querySelector('#input-file');
const img = dropArea.querySelector('#mostrar-img');
const p = dropArea.querySelector('#image-text');

dropArea.addEventListener('click', (e) => {
    input.click();
});

//cuando el archivo está encima del área
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
});

//cuando el archivo está fuera del área
dropArea.addEventListener('dragleave', (e) =>{
    e.preventDefault();
    dropArea.classList.remove('active');
});

//cuando soltamos el archivo dentro del área
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');

    input.files = e.dataTransfer.files;
    const file = input.files[0];

    uploadImage(file)
});

const uploadImage = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', (e) => {
        img.setAttribute('src', e.target.result);
        img.classList.add('upload-img');
        p.setAttribute('hidden', true);
    });
}

input.addEventListener('change', (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    dropArea.classList.add('active');
    uploadImage(file);
    dropArea.classList.remove('active');
});
