const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const target = document.getElementById('observer');

let photosArray = [];
const observer = new IntersectionObserver(getPhotos);
observer.observe(target)

// Unsplash API
let count = 10;
const apiKey = 'UAD3BYLdKHmMcbx3OJMcP8eixQJMqfu9K8';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos
async function getPhotos(observer) {
    if (!observer[0].isIntersecting) return;

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        loader.hidden = true;
    } catch (e) {
        console.log(e)
    }
}