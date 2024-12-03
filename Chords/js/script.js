// ==========================Navbar&footer=====================================
$.get('../components/navbar.html', function (data) {
  $('#nav-placeholder').replaceWith(data);
});

$.get('../components/footer.html', function (data) {
  $('#footer-placeholder').replaceWith(data);
});

$.get('components/transposebutton.html', function (data) {
  $('#transposebutton').replaceWith(data);
});

// ==========================Title tag head to Slug=====================================
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

// Transpose logic
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function transposeChords(step) {
  document.querySelectorAll('span[data-name]').forEach((span) => {
    const chord = span.getAttribute('data-name');
    const baseChord = chord.match(/[A-G][#b]?/)[0];
    const suffix = chord.slice(baseChord.length);

    let noteIndex = notes.indexOf(baseChord);
    if (noteIndex === -1) {
      noteIndex = flatNotes.indexOf(baseChord);
      if (noteIndex === -1) return; // Skip if no valid note is found
    }

    const transposedIndex = (noteIndex + step + 12) % 12;
    const transposedNote = notes[transposedIndex];
    span.textContent = transposedNote + suffix;
    span.setAttribute('data-name', transposedNote + suffix);
  });
}

// chord modal
$(document).ready(function () {
  // Load modal chord from external file
  $('#modal-placeholder').load('components/chord-modal.html', function () {
    // Attach event listeners after modal is loaded
    $('.chord').click(function () {
      var chordName = $(this).attr('data-name');
      $('#chord-image').attr('src', 'chords-library/' + chordName + '.svg');
      $('#chord-modal').fadeIn();
    });

    $('.close').click(function () {
      $('#chord-modal').fadeOut();
    });

    $(window).click(function (event) {
      if ($(event.target).is('#chord-modal')) {
        $('#chord-modal').fadeOut();
      }
    });
  });
});
