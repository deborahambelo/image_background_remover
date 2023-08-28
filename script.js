let imageURL;
const processedImg = document.querySelector('.processed-img')
const uploadImg = document.querySelector('.upload-img')
function submitHandler() {
    // console.log("click");
    const fileInput = document.getElementById('fileInput');
    console.log(fileInput.files);
    const image = fileInput.files[0];
    const uploadedImageUrl = URL.createObjectURL(image);

    // Display the uploaded image on the website
    const uploadedImg = document.createElement('img');
    uploadedImg.src = uploadedImageUrl;
    uploadImg.appendChild(uploadedImg);
    
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = "CnbjLASYDARPreTpJgDuRdo1";

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    .then(function(response) {
        return response.blob();
    })
    .then(function(blob) {
        const url = URL.createObjectURL(blob);
        imageURL = url;
        const img = document.createElement('img');
        img.src = url;
        processedImg.appendChild(img);
        
        localStorage.setItem('processedImageURL', url);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

function downloadFile() {
    var a = document.createElement('a');
    a.href = imageURL;
    a.download = 'naciasv.png';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}


function loadSavedImage() {
    const savedImageURL = localStorage.getItem('processedImageURL');
    if (savedImageURL) {
        const img = document.createElement('img');
        img.src = savedImageURL;
        processedImg.appendChild(img);
    }
}


loadSavedImage();
