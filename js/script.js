const loader = document.getElementById("loader-container");
const imageContainer = document.getElementById("image-container");

let imagesData = [];

//initialImagesToLoad
let count = 5;
// Normally, don't store API Keys like this, but an exception made here because it is free
const apiKey = "1gCxZyvUIq__5FJa70Qdw-2nR2Xk892CPqjKp9Ieys0";
const apiURL = "https://api.unsplash.com/photos/random";

let readyState = false;
let imagesLoaded = 0;
let totalImages = 0;

const onImageLoaded = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    readyState = true;
    loader.hidden = true;

    count = 30;
  }
};

const onScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyState
  ) {
    readyState = false;
    getPhotos();
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = imagesData.length;

  imagesData.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.description);
    image.setAttribute("title", photo.description);

    image.addEventListener("load", onImageLoaded);

    item.appendChild(image);
    imageContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(
      `${apiURL}/?client_id=${apiKey}&count=${count}`
    );
    imagesData = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("scroll", onScroll);

getPhotos();
