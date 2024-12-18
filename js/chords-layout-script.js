// ==========================Navbar & Footer=====================================
$.get('/components/navbar.html')
  .done(function (data) {
    $('#nav-placeholder').replaceWith(data);
  })
  .fail(function () {
    console.error('Failed to load navbar.html');
  });

$.get('/components/footer.html')
  .done(function (data) {
    $('#footer-placeholder').replaceWith(data);
  })
  .fail(function () {
    console.error('Failed to load footer.html');
  });

$.get('/components/transposebutton.html')
  .done(function (data) {
    $('#transposebutton').replaceWith(data);
  })
  .fail(function () {
    console.error('Failed to load transposebutton.html');
  });

// ==========================Transpose Logic=====================================
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function transposeChords(step) {
  document.querySelectorAll('span[data-name]').forEach((span) => {
    const chord = span.getAttribute('data-name');
    if (!chord) return; // Skip jika data-name kosong

    const match = chord.match(/[A-G][#b]?/);
    if (!match) return; // Skip jika chord tidak valid

    const baseChord = match[0];
    const suffix = chord.slice(baseChord.length);

    let noteIndex = notes.indexOf(baseChord);
    if (noteIndex === -1) {
      noteIndex = flatNotes.indexOf(baseChord);
      if (noteIndex === -1) return; // Skip jika tidak ditemukan di kedua array
    }

    const transposedIndex = (noteIndex + step + 12) % 12;
    const transposedNote = notes[transposedIndex];
    span.textContent = transposedNote + suffix;
    span.setAttribute('data-name', transposedNote + suffix);
  });
}

// ==========================Chord Modal=====================================
$(document).ready(function () {
  // Load modal chord
  $('#modal-placeholder').load('/components/chord-modal.html', function () {
    console.log('Chord modal loaded successfully.');

    // Attach event listeners after modal is loaded
    $(document).on('click', '.chord', function () {
      const chordName = $(this).attr('data-name');
      const imgSrc = `chords-library/${chordName}.svg`;

      $('#chord-image')
        .attr('src', imgSrc)
        .on('error', function () {
          console.error(`Image not found: ${imgSrc}`);
          $(this).attr('src', 'chords-library/default.svg'); // Fallback image
        });

      $('#chord-modal').fadeIn();
    });

    // Close modal logic
    $(document).on('click', '.close', function () {
      $('#chord-modal').fadeOut();
    });

    $(window).on('click', function (event) {
      if ($(event.target).is('#chord-modal')) {
        $('#chord-modal').fadeOut();
      }
    });
  });
});
