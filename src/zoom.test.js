import zoom from './zoom'

describe('actual', () => {
  test('zoomed', () => {
    expect(zoom()).toEqual({
      viewBox: '176 11.5 6 9.6',
      yScale: 25,
    })
  })

  test('full', () => {
    expect(zoom(true)).toEqual({
      viewBox: '173 0 10 16',
      yScale: 14,
    })
  })
})
