// ==========================Navbar&footer=====================================
$.get('components/navbar.html', function (data) {
  $('#nav-placeholder').replaceWith(data);
});

$.get('components/footer.html', function (data) {
  $('#footer-placeholder').replaceWith(data);
});

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

// // ==========================Title tag head to Slug=====================================
// function convertToSlug(text) {
//   return text
//     .toLowerCase()
//     .replace(/ /g, '-')
//     .replace(/[^\w-]+/g, '');
// }

// $(document).ready(function () {
//   const title = $('title').text();
//   const slug = convertToSlug(title);

//   const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
//   const newUrl = `${window.location.protocol}//${window.location.host}${currentPath}/${slug}`;
//   window.history.replaceState({path: newUrl}, '', newUrl);

//   console.log(newUrl);
// });
