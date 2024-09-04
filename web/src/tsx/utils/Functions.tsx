export function hexToRgb(hex: string, shade: number) {
  const bigint = parseInt(hex.replace(/[^0-9A-F]/gi, ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return (
    Math.round(r * shade) +
    ',' +
    Math.round(g * shade) +
    ',' +
    Math.round(b * shade)
  );
}
