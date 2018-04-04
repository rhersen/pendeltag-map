import zoom from './zoom'

describe('actual', () => {
  const regExp = /([\\.\d]+) ([\\.\d]+) ([\\.\d]+) ([\\.\d]+)/

  test('full', () => {
    const actual = zoom(1)
    const [, minX, minY, width, height] = regExp.exec(actual.viewBox)
    expect(parseFloat(minX)).toBeCloseTo(173)
    expect(parseFloat(minY)).toBeCloseTo(0)
    expect(parseFloat(width)).toBeCloseTo(10)
    expect(parseFloat(height)).toBeCloseTo(16)
    expect(actual.yScale).toBeCloseTo(14)
  })

  test('mid', () => {
    const actual = zoom(1.5)
    const [, minX, minY, width, height] = regExp.exec(actual.viewBox)
    expect(parseFloat(minX)).toBeCloseTo(174.5)
    expect(parseFloat(minY)).toBeCloseTo(5.75)
    expect(parseFloat(width)).toBeCloseTo(8)
    expect(parseFloat(height)).toBeCloseTo(12.8)
    expect(actual.yScale).toBeCloseTo(19.5)
  })

  test('zoomed', () => {
    const actual = zoom(2)
    const [, minX, minY, width, height] = regExp.exec(actual.viewBox)
    expect(parseFloat(minX)).toBeCloseTo(176)
    expect(parseFloat(minY)).toBeCloseTo(11.5)
    expect(parseFloat(width)).toBeCloseTo(6)
    expect(parseFloat(height)).toBeCloseTo(9.6)
    expect(actual.yScale).toBeCloseTo(25)
  })
})
