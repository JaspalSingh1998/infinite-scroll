const container = document.querySelector(".container");

const ACCESS_KEY = "fxTIU5wQp9daTQp4j-8LHetSZTXjX0Mc89_wVAoZ5XU";
let page = 1;
const perPage = 12;
const URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&per_page=${perPage}`;

async function fetchPhotos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    displayPhotos(data);
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos(data) {
  data.map((img) => {
    const imgUrl = img.urls.regular;
    const imgEl = document.createElement("img");
    imgEl.src = imgUrl;
    container.appendChild(imgEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  setTimeout(() => {
    setTimeout(() => {
      page++;
      fetchPhotos();
    }, 300);
  }, 1000);
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});

fetchPhotos();
