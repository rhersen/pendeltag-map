const re = /....-..-..T..:(..):../

export function delay(a) {
  if (!a) return ''

  const at = re.exec(a.AdvertisedTimeAtLocation)
  const t = re.exec(a.TimeAtLocation)

  if (!t || !at) return ''

  const d1 = t[1] - at[1]
  const d2 = d1 < -1 ? d1 + 60 : d1
  const d3 = d2 > 7 ? 8 : d2
  return `delay${d3}`
}
