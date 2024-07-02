// ==========================Navbar&footer=====================================
$.get('../components/navbar.html', function (data) {
  $('#nav-placeholder').replaceWith(data);
});

$.get('../components/footer.html', function (data) {
  $('#footer-placeholder').replaceWith(data);
});

// ==========================Title to Slug=====================================
function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-') // Ganti spasi dengan tanda hubung
    .replace(/[^\w-]+/g, ''); // Hapus karakter non-alphanumeric kecuali tanda hubung
}

$(document).ready(function () {
  const title = $('#title').text();
  const slug = convertToSlug(title);

  // Ubah URL
  const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
  const newUrl = `${window.location.protocol}//${window.location.host}${currentPath}/${slug}`;
  window.history.replaceState({path: newUrl}, '', newUrl);

  console.log(newUrl);
});
