import * as classes from './classes'

describe('actual', () => {
  test('empty', () => {
    expect(classes.delay()).toBe('')
    expect(classes.delay({})).toBe('')
  })

  test('one minute late', () => {
    expect(
      classes.delay({
        AdvertisedTimeAtLocation: '2018-01-03T21:44:00',
        TimeAtLocation: '2018-01-03T21:45:00',
      })
    ).toBe('delay1')
  })

  test('one minute early', () => {
    expect(
      classes.delay({
        AdvertisedTimeAtLocation: '2018-01-03T21:45:00',
        TimeAtLocation: '2018-01-03T21:44:00',
      })
    ).toBe('delay-1')
  })

  test('more than 8 minutes late', () => {
    expect(
      classes.delay({
        AdvertisedTimeAtLocation: '2018-01-03T21:42:00',
        TimeAtLocation: '2018-01-03T21:52:00',
      })
    ).toBe('delay8')
  })

  test('hour wrap', () => {
    expect(
      classes.delay({
        AdvertisedTimeAtLocation: '2018-01-03T21:54:00',
        TimeAtLocation: '2018-01-03T22:02:00',
      })
    ).toBe('delay8')
  })
})
