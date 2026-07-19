const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const assets = path.join(__dirname, "..", "assets");
const masterSvg = path.join(assets, "owe-me.svg");

async function main() {
  // Master raster from the branded SVG (white mark on black)
  const master = await sharp(masterSvg).resize(2000, 2000).png().toBuffer();

  await sharp(master).resize(1024, 1024).png().toFile(path.join(assets, "icon.png"));
  await sharp(master).resize(1024, 1024).png().toFile(path.join(assets, "adaptive-icon.png"));
  await sharp(master).resize(1024, 1024).png().toFile(path.join(assets, "splash-icon.png"));
  await sharp(master).resize(48, 48).png().toFile(path.join(assets, "favicon.png"));
  await sharp(master).resize(512, 512).png().toFile(path.join(assets, "logo.png"));

  console.log("Generated icon.png, adaptive-icon.png, splash-icon.png, favicon.png, logo.png from owe-me.svg");
  console.log("Kept source vectors: owe-me.svg, owe-me-no-bg.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
