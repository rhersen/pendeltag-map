export default function zoom(scale) {
  const minX = 170 + 3 * scale
  const minY = -11.5 + 11.5 * scale
  const width = 14 - 4 * scale
  const height = 22.4 - 6.4 * scale

  return {
    viewBox: `${minX} ${minY} ${width} ${height}`,
    yScale: 3 + 11 * scale,
  }
}
