// ========================== Chord Modal =====================================
$(document).ready(function () {
  console.log('🎸 Chord modal system initialized.');

  // Inject modal HTML langsung ke body
  const modalHTML = `
    <div id="chord-modal" class="modal" style="display:none;">
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <span class="close">&times;</span>
        <img id="chord-image" src="" alt="Chord Diagram" />
      </div>
    </div>
  `;
  $('body').append(modalHTML);

  // Klik chord
  $(document).on('click', '.chord', function () {
    console.log('\n========== CHORD CLICKED ==========');

    const chordName = $(this).attr('data-name')?.trim() || $(this).text().trim();
    console.log('🎵 Original chord:', chordName);

    if (!chordName) {
      console.error('❌ Tidak ada nama chord ditemukan');
      return;
    }

    // 🔧 Konversi nama chord ke format nama file
    const fileName = chordName
      .replace(/\//g, 'on') // "B/C#" → "BonC#"
      .replace(/♯/g, 'Sharp') // unicode sharp
      .replace(/#/g, 'Sharp') // simbol sharp
      .replace(/♭/g, 'b') // unicode flat ke 'b'
      .replace(/\s+/g, '') // hapus spasi
      .replace(/M7$/, 'Maj7') // huruf besar M7 → Maj7
      .replace(/[^A-Za-z0-9_\-]/g, ''); // hapus karakter tidak valid

    console.log('🪶 Converted fileName:', fileName);

    // Pastikan modal siap
    if (!$('#chord-modal').length || !$('#chord-image').length) {
      console.error('❌ Modal belum siap!');
      alert('Modal belum siap. Silakan tunggu sebentar lalu coba lagi.');
      return;
    }

    // Tampilkan modal
    $('#chord-modal').css('display', 'flex').hide().fadeIn(100);

    // Reset isi modal
    $('#chord-message').remove();
    $('#chord-image').hide().attr('src', '');
    $('.modal-content').append('<p id="chord-message" style="margin-top: 15px;">Loading chord...</p>');

    const basePath = `https://mychords.vercel.app/images/chords-library/${fileName}`;
    const extensions = ['svg', 'png', 'jpg', 'jpeg'];
    let index = 0;

    function tryNextExtension() {
      if (index >= extensions.length) {
        console.error('❌ Semua format gagal dimuat');
        $('#chord-message').text('Chord not found').css('color', '#e31708');
        return;
      }

      const fullPath = `${basePath}.${extensions[index]}`;
      console.log(`🔍 Attempt ${index + 1}/${extensions.length}: ${fullPath}`);

      const img = new Image();
      img.onload = function () {
        console.log('✅ Image loaded successfully:', fullPath);
        $('#chord-message').remove();
        $('#chord-image').attr('src', fullPath).css({display: 'block', 'max-width': '100%', margin: '10px auto'}).fadeIn(200);
      };
      img.onerror = function () {
        console.warn('❌ Not found:', fullPath);
        index++;
        tryNextExtension();
      };
      img.src = fullPath;
    }

    tryNextExtension();
  });

  // Tutup modal
  $(document).on('click', '.close', function () {
    $('#chord-modal').fadeOut();
  });

  // Klik luar modal → tutup
  $(window).on('click', function (event) {
    if ($(event.target).is('#chord-modal')) {
      $('#chord-modal').fadeOut();
    }
  });
});
