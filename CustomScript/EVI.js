//VERSION=3
function setup() {
  return {
    input: ["B02", "B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // 1. EVI の計算
  const denom = sample.B08 + 6 * sample.B04 - 7.5 * sample.B02 + 1;
  let evi = denom === 0 ? 0 : 2.5 * (sample.B08 - sample.B04) / denom;
  evi = Math.max(-1, Math.min(2, evi));

  // 2. HTML の applyColormap('ndvi') と同一のフラット配色
  let r, g, b;

  if (evi < 0.2) {
    r = 190 / 255; g = 170 / 255; b = 120 / 255;  // 茶色
  } else if (evi < 0.4) {
    r = 255 / 255; g = 255 / 255; b = 180 / 255;  // 薄黄色
  } else if (evi < 0.6) {
    r = 144 / 255; g = 238 / 255; b = 144 / 255;  // 薄緑色
  } else if (evi < 0.8) {
    r =  50 / 255; g = 205 / 255; b =  50 / 255;  // 緑色
  } else {
    r =   0 / 255; g = 100 / 255; b =   0 / 255;  // 濃緑色
  }

  // 3. 透過マスクを適用して出力
  return [r, g, b, sample.dataMask];
}