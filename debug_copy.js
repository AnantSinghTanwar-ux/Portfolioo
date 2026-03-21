const fs = require('fs');
const zoro = 'D:\\wallpapers 2\\yeee\\roronoa-zoro-one-3840x2160-10523.png';
const pic = 'C:\\Users\\maste\\Desktop\\pic.jpeg';
const p_zoro = 'C:\\Users\\maste\\Desktop\\portfolio\\public\\zoro-bg.png';
const p_pic = 'C:\\Users\\maste\\Desktop\\portfolio\\public\\pic.jpeg';

let log = '';
try {
  log += 'zoro exists: ' + fs.existsSync(zoro) + '\n';
  log += 'pic exists: ' + fs.existsSync(pic) + '\n';
  
  if (fs.existsSync(zoro)) fs.copyFileSync(zoro, p_zoro);
  if (fs.existsSync(pic)) fs.copyFileSync(pic, p_pic);
  
  log += 'zoro copied: ' + fs.existsSync(p_zoro) + '\n';
  log += 'pic copied: ' + fs.existsSync(p_pic) + '\n';
} catch (err) {
  log += 'ERROR: ' + err.message + '\n';
}
fs.writeFileSync('C:\\Users\\maste\\Desktop\\portfolio\\debug_copy.txt', log);
