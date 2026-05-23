//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // 1. MSAVI の計算
  // MSAVI = (2×NIR + 1 - √((2×NIR + 1)² - 8×(NIR - Red))) / 2
  const inner = (2 * sample.B08 + 1) ** 2 - 8 * (sample.B08 - sample.B04);
  let msavi = inner < 0 ? 0 : (2 * sample.B08 + 1 - Math.sqrt(inner)) / 2;

  // 2. HTML の applyColormap('ndvi') と同一のフラット配色
  let r, g, b;

  if (msavi < 0.2) {
    r = 190 / 255; g = 170 / 255; b = 120 / 255;  // 茶色
  } else if (msavi < 0.4) {
    r = 255 / 255; g = 255 / 255; b = 180 / 255;  // 薄黄色
  } else if (msavi < 0.6) {
    r = 144 / 255; g = 238 / 255; b = 144 / 255;  // 薄緑色
  } else if (msavi < 0.8) {
    r =  50 / 255; g = 205 / 255; b =  50 / 255;  // 緑色
  } else {
    r =   0 / 255; g = 100 / 255; b =   0 / 255;  // 濃緑色
  }

  // 3. 透過マスクを適用して出力
  return [r, g, b, sample.dataMask];
}