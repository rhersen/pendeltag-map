export default function zoom(isFull) {
  const zoomed = {
    viewBox: '176 12 6 10',
    yScale: 26,
  }

  const full = {
    viewBox: '173 0 10 16',
    yScale: 14,
  }

  return isFull ? full : zoomed
}
