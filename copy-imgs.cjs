const fs = require('fs');
try {
  fs.copyFileSync('C:\\Users\\maste\\Desktop\\pic.jpeg', 'C:\\Users\\maste\\Desktop\\portfolio\\public\\pic.jpeg');
  fs.copyFileSync('D:\\wallpapers 2\\yeee\\roronoa-zoro-one-3840x2160-10523.png', 'C:\\Users\\maste\\Desktop\\portfolio\\public\\zoro-bg.png');
  console.log('Done');
} catch (e) {
  console.error(e);
}
