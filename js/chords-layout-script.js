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

    // Event listener klik chord (gunakan delegation agar dinamis)
    $(document).on('click', '.chord', function () {
      const chordName = $(this).attr('data-name') || $(this).text().trim();
      const imgSrc = `/images/chords-library/${chordName}.svg`;

      // Reset modal content dulu biar bersih
      $('#chord-image').hide(); // Sembunyikan gambar dulu
      $('#chord-message').remove(); // Hapus pesan sebelumnya kalau ada

      // Load gambar
      $('#chord-image')
        .attr('src', imgSrc)
        .off('error') // Bersihkan handler sebelumnya biar ga numpuk
        .on('error', function () {
          console.error(`Image not found: ${imgSrc}`);

          // Ganti gambar dengan teks "Chord not found"
          $(this).hide(); // Sembunyikan gambar
          $('<p id="chord-message">Chord not found</p>').appendTo('.modal-content');
        })
        .show();

      $('#chord-modal').fadeIn();
    });

    // Close modal
    $(document).on('click', '.close', function () {
      $('#chord-modal').fadeOut();
    });

    // Klik luar modal untuk close
    $(window).on('click', function (event) {
      if ($(event.target).is('#chord-modal')) {
        $('#chord-modal').fadeOut();
      }
    });
  });
});
