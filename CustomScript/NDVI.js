//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);

  // HTMLの applyColormap('ndvi') と完全一致するフラット配色
  // ndvi < 0（水面など）も 0.2 未満として茶色に統一
  let r, g, b;

  if (ndvi < 0.2) {
    r = 190 / 255; g = 170 / 255; b = 120 / 255;  // 茶色
  } else if (ndvi < 0.4) {
    r = 255 / 255; g = 255 / 255; b = 180 / 255;  // 薄黄色
  } else if (ndvi < 0.6) {
    r = 144 / 255; g = 238 / 255; b = 144 / 255;  // 薄緑色
  } else if (ndvi < 0.8) {
    r =  50 / 255; g = 205 / 255; b =  50 / 255;  // 緑色
  } else {
    r =   0 / 255; g = 100 / 255; b =   0 / 255;  // 濃緑色
  }

  return [r, g, b, sample.dataMask];
}