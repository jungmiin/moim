// 파스텔 톤의 색상 생성
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
export const getRandomPastelColor = () => {
  return hslToHex(
    160 * Math.random(),
    25 + 30 * Math.random(),
    70 + 10 * Math.random()
  );
};
