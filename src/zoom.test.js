import zoom from './zoom'

describe('actual', () => {
  test('zoomed', () => {
    expect(zoom()).toEqual({
      viewBox: '176 12 6 10',
      yScale: 26,
    })
  })

  test('full', () => {
    expect(zoom(true)).toEqual({
      viewBox: '173 0 10 16',
      yScale: 14,
    })
  })
})
