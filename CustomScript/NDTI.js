//VERSION=3
function setup() {
  return {
    // Sentinel-2にあるバンドだけで計算します
    input: ["B12", "B08", "B03", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // 1. 熱や乾燥を感知するインデックスを計算
  // 乾燥して熱い地面ほど数値が大きくなります
  let heatIndex = (sample.B12 - sample.B08) / (sample.B12 + sample.B08 + 0.0001);
  
  // 2. 画面で見やすくなるように数値を 0〜1 の範囲に調整
  let s = (heatIndex + 0.5) / 1.0; 
  s = Math.max(0.0, Math.min(1.0, s));

  // 3. 色の割り当て（熱い＝赤、中間＝緑、涼しい・潤っている＝青）
  let r = s;
  let g = 1.0 - Math.abs(s - 0.5) * 2;
  let b = 1.0 - s;

  // 4. 指定された通り、4つのバンド（RGB + dataMask）で出力
  return [r, g, b, sample.dataMask];
}