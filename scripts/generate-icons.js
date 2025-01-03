const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = {
  logo: [192, 512],
  shortcut: [96]
};

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../client/public/images/logo.svg'));
  
  // Generate main logo icons
  for (const size of SIZES.logo) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../client/public/images/logo-${size}.png`));
  }
  
  // Generate shortcut icons with different colors
  const shortcuts = ['livestock', 'orders', 'inventory'];
  const colors = ['#1d4ed8', '#dc2626', '#0891b2']; // blue, red, cyan
  
  for (let i = 0; i < shortcuts.length; i++) {
    const coloredSvg = svgBuffer.toString('utf8').replace('#059669', colors[i]);
    await sharp(Buffer.from(coloredSvg))
      .resize(96, 96)
      .png()
      .toFile(path.join(__dirname, `../client/public/images/${shortcuts[i]}.png`));
  }
}

generateIcons().catch(console.error); 