const API_URL = "https://fetch-images-api.fly.dev";
// const API_URL = "http://localhost:3000";
const imagesRef = document.getElementById("imagesRef");
const uploadBtn = document.getElementById("uploadBtn");
const frameToGet = document.getElementById("frameToGet");
const getImagesBtn = document.getElementById("getImagesBtn");
const imagesContainer = document.getElementById("imagesContainer");

function handleUpload(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("frame[title]", "Test");

  for (let i = 0; i < imagesRef.files.length; i++) {
    formData.append("frame[images][]", imagesRef.files[i]);
  }
  frameData(formData);
}

function frameData(formData) {
  fetch(`${API_URL}/frames`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      frameToGet.value = data.id
      getImages();
    })
    .catch((err) => console.log(err));
}

function getImages() {
  fetch(`${API_URL}/frames/${frameToGet.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setImages(data.images);
    })
    .catch((err) => console.log(err));
}

function setImages(images) {
  imagesContainer.innerHTML = "";
  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = "uploaded";
    img.style.width = "200px";
    img.style.height = "200px";
    imagesContainer.appendChild(img);
  });
}

uploadBtn.addEventListener("click", handleUpload);
getImagesBtn.addEventListener("click", getImages);