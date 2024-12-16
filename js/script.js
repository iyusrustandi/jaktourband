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

//songlist.html script
// $(document).ready(function () {
//   let tableData = [];
//   let pageSize = 15;
//   let currentPage = 1;

//   // Load data from JSON file
//   $.getJSON('data.json')
//     .done((data) => {
//       tableData = data;
//       updateTable();
//       renderPagination();
//     })
//     .fail(() => {
//       console.error('Failed to load data.json');
//       $('#table-id tbody').html('<tr><td colspan="5">Error loading data</td></tr>');
//     });

//   // Update table content
//   function updateTable() {
//     const searchInput = $('#search_input_all').val().toLowerCase();
//     const filteredData = tableData.filter((item) => item.artist.toLowerCase().includes(searchInput) || item.song.toLowerCase().includes(searchInput));

//     const startIndex = (currentPage - 1) * pageSize;
//     const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

//     const tableBody = $('#table-id tbody');
//     tableBody.empty();

//     if (paginatedData.length === 0) {
//       tableBody.append('<tr><td colspan="5">No data found</td></tr>');
//       return;
//     }

//     paginatedData.forEach((item, index) => {
//       const row = `
//         <tr>
//           <td>${startIndex + index + 1}</td>
//           <td>${item.artist}</td>
//           <td>${item.song}</td>
//           <td><button class="btn-lyric" onclick="window.open('${item.lyrics || '#'}', '_blank')">Lyric</button></td>
//           <td><button class="btn-youtube" onclick="window.open('${item.youtube || '#'}', '_blank')">YouTube</button></td>
//         </tr>`;
//       tableBody.append(row);
//     });
//   }

//   // Render pagination
//   function renderPagination() {
//     const filteredData = tableData.filter((item) => item.artist.toLowerCase().includes($('#search_input_all').val().toLowerCase()) || item.song.toLowerCase().includes($('#search_input_all').val().toLowerCase()));

//     const totalData = filteredData.length;
//     const totalPages = Math.ceil(totalData / pageSize);

//     const startIndex = (currentPage - 1) * pageSize + 1;
//     const endIndex = Math.min(startIndex + pageSize - 1, totalData);

//     const paginationContainer = $('#pagination-container');
//     paginationContainer.empty();

//     const previousButton = $('<button>')
//       .addClass('btn-pagination')
//       .text('Previous')
//       .prop('disabled', currentPage === 1)
//       .on('click', () => {
//         if (currentPage > 1) {
//           currentPage--;
//           updateTable();
//           renderPagination();
//         }
//       });

//     const nextButton = $('<button>')
//       .addClass('btn-pagination')
//       .text('Next')
//       .prop('disabled', currentPage === totalPages)
//       .on('click', () => {
//         if (currentPage < totalPages) {
//           currentPage++;
//           updateTable();
//           renderPagination();
//         }
//       });

//     const paginationInfo = $('<span>')
//       .addClass('text-pagination')
//       .text('Showing ' + startIndex + ' to ' + endIndex + ' of ' + totalData + ' entries');

//     paginationContainer.append(previousButton, paginationInfo, nextButton);
//   }

//   // Rows per page selector
//   $('#maxRows').on('change', function () {
//     pageSize = parseInt($(this).val(), 10);
//     currentPage = 1;
//     updateTable();
//     renderPagination();
//   });

//   // Search input
//   $('#search_input_all').on('input', function () {
//     currentPage = 1;
//     updateTable();
//     renderPagination();
//   });
// });
