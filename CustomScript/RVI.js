//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // 1. RVI の計算
  // RVI = NIR / Red
  let rvi = sample.B04 === 0 ? 0 : sample.B08 / sample.B04;

  // RVI の典型範囲は 1〜30 程度
  // HTML の calcIndex('rvi') は spectral カラーマップを使用
  // → 0〜10 を 0〜1 に正規化して spectral 相当の配色に変換
  const RVI_MAX = 10;
  const t = Math.max(0, Math.min(1, rvi / RVI_MAX));

  // 2. HTML の applyColormap('spectral') と同一のフラット配色
  let r, g, b;

  if (t < 0.25) {
    const s = t / 0.25;
    r = 0;
    g = Math.round(s * 255) / 255;
    b = 1;
  } else if (t < 0.5) {
    const s = (t - 0.25) / 0.25;
    r = 0;
    g = 1;
    b = Math.round((1 - s) * 255) / 255;
  } else if (t < 0.75) {
    const s = (t - 0.5) / 0.25;
    r = Math.round(s * 255) / 255;
    g = 1;
    b = 0;
  } else {
    const s = (t - 0.75) / 0.25;
    r = 1;
    g = Math.round((1 - s) * 255) / 255;
    b = 0;
  }

  // 3. 透過マスクを適用して出力
  return [r, g, b, sample.dataMask];
}