// Memuat Navbar dan Footer
$(document).ready(function () {
  $.get('/components/navbar.html', function (data) {
    $('#nav-placeholder').replaceWith(data);
  });

  $.get('/components/footer.html', function (data) {
    $('#footer-placeholder').replaceWith(data);
  });
});

// Memuat Galeri Gambar dari JSON
document.addEventListener('DOMContentLoaded', function () {
  fetch('/api/gallery.json')
    .then((response) => response.json())
    .then((data) => {
      let galleryContainer = document.getElementById('gallery-container');
      let slidesHtml = '';

      data.forEach((item, index) => {
        slidesHtml += `
          <div class="mySlides">
            <div class="numbertext">${index + 1} / ${data.length}</div>
            <img src="${item.src}" style="width: 100%" class="iamges" year="${item.year}" />
          </div>`;
      });

      galleryContainer.innerHTML = slidesHtml;
      showSlides(slideIndex);
    })
    .catch((error) => console.error('Error fetching gallery data:', error));
});

// Fungsi untuk Navigasi Slide
let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('iamges');
  let captionText = document.getElementById('caption');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  captionText.innerHTML = dots[slideIndex - 1].year;
}

// Memuat Galeri Video dari JSON
async function loadVideoGallery() {
  try {
    const response = await fetch('/api/videogallery.json');
    const videos = await response.json();

    const videoGallery = document.getElementById('video-gallery');
    videoGallery.innerHTML = ''; // Kosongkan sebelum menambahkan elemen

    videos.forEach((video) => {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('video-container');

      videoContainer.innerHTML = `
          <div class="responsive-video">
            <iframe src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;

      videoGallery.appendChild(videoContainer);
    });
  } catch (error) {
    console.error('Error loading video gallery:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadVideoGallery);
