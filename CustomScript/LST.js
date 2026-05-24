//VERSION=3
//Default Complementary Data Landsat 8-9
function setup() {
  return {
    input: ["B10", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // 生データをそのままケルビン温度として扱い、摂氏（°C）に変換します
  let celsius = sample.B10 - 273.15;

  // 【設定】対象の日付に合わせた温度の引き伸ばし範囲
  // 夏場なら [15.0, 40.0]、冬〜春先なら [0.0, 20.0] あたりに調整します
  let minTemp = 10.0;  
  let maxTemp = 30.0; 

  let s = (celsius - minTemp) / (maxTemp - minTemp);
  s = Math.max(0.0, Math.min(1.0, s));

  // 高温＝赤、中温＝緑、低温＝青
  let r = s;
  let g = 1.0 - Math.abs(s - 0.5) * 2;
  let b = 1.0 - s;

  return [r, g, b, sample.dataMask];
}