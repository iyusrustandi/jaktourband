const fs = require('fs');

// Fungsi utama konversi
function convertLirikChordToHTML(inputLirikChord) {
  const lines = inputLirikChord.split('\n');
  let htmlOutput = '<div class="lyric">\n  <pre>\n';
  let sectionTitle = '';

  const chordRegex = /([A-G][#b]?m?(?:aug|dim|sus[24]?|add\d+|maj7|m7|7)?)/g;

  lines.forEach((line) => {
    line = line.trim();

    // Cek apakah line kosong
    if (line === '') {
      htmlOutput += '    <br>\n';
      return;
    }

    // Cek apakah ini intro/interlude/outro/section
    if (/Intro|Interlude|Outro|Reff|Bridge|Verse|Chorus|Coda/i.test(line)) {
      sectionTitle = line;
      htmlOutput += `    <span class="section-title">\n    ${sectionTitle}\n    </span>\n`;
      return;
    }

    // Gantilah chord di dalam baris menjadi span
    const convertedLine = line.replace(chordRegex, (match) => {
      return `<span data-name="${match}" class="chord">${match}</span>`;
    });

    htmlOutput += `    ${convertedLine}\n`;
  });

  htmlOutput += '  </pre>\n</div>';

  return htmlOutput;
}

// Contoh penggunaan
const inputLirikChord = `
Intro : E F G F E
	F E F E

     E
Ada anak bertanya pada bapaknya
      F                 E
Buat apa berlapar-lapar puasa
     E
Ada anak bertanya pada bapaknya
        F                  E
Tadarus tarawih apalah gunanya


Reff
E                           
Lapar mengajarmu rendah hati selalu
E                             
Tadarus artinya memahami kitab suci
E                            
Tarawih mendekatkan diri pada Ilahi


         E
Lihatlah langit keampunan yang indah
         F                      E
Membuka luas dan angin pun semerbak
         E
Nafsu amarah terbelenggu dan lemah
       F                      E
Bunga ibadah dalam ikhlas sedekah


Reff
  E                              
Lapar mengajarmu rendah hati selalu
  E                              
Tadarus artinya memahami kitab suci
  E                             
Tarawih mendekatkan diri pada Ilahi


Interlude : E F G F E
	    F E F E

     E
Ada anak bertanya pada bapaknya
      F                 E
Buat apa berlapar-lapar puasa
     E
Ada anak bertanya pada bapaknya
        F                  E
Tadarus tarawih apalah gunanya


Reff
E                           
Lapar mengajarmu rendah hati selalu
E                             
Tadarus artinya memahami kitab suci
E                            
Tarawih mendekatkan diri pada Ilahi


         E
Lihatlah langit keampunan yang indah
         F                      E
Membuka luas dan angin pun semerbak
         E
Nafsu amarah terbelenggu dan lemah
       F                      E
Bunga ibadah dalam ikhlas sedekah


Reff
  E                              
Lapar mengajarmu rendah hati selalu
  E                              
Tadarus artinya memahami kitab suci
  E                             
Tarawih mendekatkan diri pada Ilahi

Outro : F E F E
	F-E F-E 
	E
`;

// Konversi dan tampilkan
const htmlOutput = convertLirikChordToHTML(inputLirikChord);
console.log(htmlOutput);

// Simpan ke file (opsional)
fs.writeFileSync('outputLirikChord.html', htmlOutput);
console.log('Konversi selesai! Hasil disimpan di outputLirikChord.html');
