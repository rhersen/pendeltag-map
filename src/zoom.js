export default function zoom(isFull) {
  const zoomed = {
    viewBox: '176 11.5 6 9.6',
    yScale: 25,
  }

  const full = {
    viewBox: '173 0 10 16',
    yScale: 14,
  }

  return isFull ? full : zoomed
}
