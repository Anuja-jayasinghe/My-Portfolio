import sharp from 'sharp';
import fs from 'fs';

sharp('public/logo-black.svg')
  .resize(64, 64)
  .png()
  .toFile('public/favicon.ico')
  .then(() => {
    console.log('Successfully created public/favicon.ico');
    if (fs.existsSync('src/app/favicon.ico')) {
      fs.unlinkSync('src/app/favicon.ico');
      console.log('Deleted default Vercel src/app/favicon.ico');
    }
  })
  .catch(err => console.error(err));
