// ==========================Navbar&footer=====================================
$.get('/components/navbar.html', function (data) {
  $('#nav-placeholder').replaceWith(data);
});

$.get('/components/footer.html', function (data) {
  $('#footer-placeholder').replaceWith(data);
});

document.addEventListener('DOMContentLoaded', () => {
  fetchSlideshow();
  fetchAbout();
  fetchMembers();
});

async function fetchSlideshow() {
  try {
    const response = await fetch('api/slideshow.json');
    const slides = await response.json();
    const container = document.getElementById('slideshow-container');
    const dotsContainer = document.getElementById('dots-container');

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    slides.forEach((slide, index) => {
      // Create slide
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('mySlides', 'fade');
      slideDiv.innerHTML = `
        <div class="numbertext">${index + 1} / ${slides.length}</div>
        <img src="${slide.slideshow}" alt="Slideshow Image" style="width: 100%" />
      `;
      container.appendChild(slideDiv);

      // Create dot
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('onclick', `currentSlide(${index + 1})`);
      dotsContainer.appendChild(dot);
    });

    showSlides();
  } catch (error) {
    console.error('Error fetching slideshow data:', error);
  }
}

let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');

  if (slides.length === 0) return;

  for (let slide of slides) slide.style.display = 'none';
  for (let dot of dots) dot.classList.remove('active');

  slideIndex = (slideIndex + 1) % slides.length;

  slides[slideIndex].style.display = 'block';
  dots[slideIndex].classList.add('active');

  setTimeout(showSlides, 3000);
}

async function fetchAbout() {
  try {
    const response = await fetch('api/about.json');
    const data = await response.json();
    document.getElementById('about-image').src = data.image;
    document.getElementById('about-description').innerText = data.description;
  } catch (error) {
    console.error('Error fetching about data:', error);
  }
}

async function fetchMembers() {
  try {
    const response = await fetch('api/member.json');
    const members = await response.json();
    const container = document.getElementById('member-container');

    container.innerHTML = '';

    members.forEach((member) => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('gallery');
      memberDiv.innerHTML = `
        <a target="_blank" href="#">
          <img src="${member.image}" alt="${member.name}" />
        </a>
        <div class="desc">${member.role}</div>
        <div class="media">
          <a href="${member.facebook}" class="fb"><i class="fa fa-facebook"></i></a>
          <a href="${member.instagram}" class="insta"><i class="fa fa-instagram"></i></a>
        </div>
      `;
      container.appendChild(memberDiv);
    });

    // Inisialisasi Glider.js setelah anggota dimuat
    new Glider(document.querySelector('.glider'), {
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true,
      dots: '.dots',
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next',
      },
      responsive: [
        {breakpoint: 600, settings: {slidesToShow: 2, slidesToScroll: 1}},
        {breakpoint: 900, settings: {slidesToShow: 3, slidesToScroll: 1}},
      ],
    });
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

// SI SETTING
$(function () {
  // Just to append id number for each row
  default_index();
});

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
  //Default rows showing
  var end_index = maxRows * pageNum;
  var start_index = maxRows * pageNum - maxRows + parseFloat(1);
  var string = 'Showing ' + start_index + ' to ' + end_index + ' of ' + totalRows + ' entries';
  $('.rows_count').html(string);
}

// songlist page main script

// ===================automatic number table======================
function default_index() {
  $('table tr:eq(0)').prepend('<th> No </th>');

  var id = 0;

  $('table tr:gt(0)').each(function () {
    id++;
    $(this).prepend('<td>' + id + '</td>');
  });
}

// All Table search script
function FilterkeyWord_all_table() {
  // Count td if you want to search on all table instead of specific column

  var count = $('.table').children('tbody').children('tr:first-child').children('td').length;

  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById('search_input_all');
  var input_value = document.getElementById('search_input_all').value;
  filter = input.value.toLowerCase();
  if (input_value != '') {
    table = document.getElementById('table-id');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      var flag = 0;

      for (j = 0; j < count; j++) {
        td = tr[i].getElementsByTagName('td')[j];
        if (td) {
          var td_text = td.innerHTML;
          if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
            //var td_text = td.innerHTML;
            //td.innerHTML = 'shaban';
            flag = 1;
          } else {
            //DO NOTHING
          }
        }
      }
      if (flag == 1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  } else {
    $('#maxRows').trigger('change');
  }
}
