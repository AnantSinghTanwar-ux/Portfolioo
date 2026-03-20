const fs = require('fs');

try {
  fs.copyFileSync('C:\\Users\\maste\\.gemini\\antigravity\\brain\\3bb988b1-58c6-4576-a855-edc058e8f676\\media__1773968056380.png', 'public/gpay-qr.png');
  console.log('QR copied');
  fs.copyFileSync('C:\\Users\\maste\\.gemini\\antigravity\\brain\\3bb988b1-58c6-4576-a855-edc058e8f676\\media__1773967787003.png', 'public/anime-bg.png');
  console.log('Anime bg copied');
} catch (err) {
  console.error(err);
}
