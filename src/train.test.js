import * as train from './train'

test('estimated', () => {
  expect(train.estimated([])).toEqual([])

  expect(
    train.estimated([
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([
    activity('Hu', 'Ankomst', '07:17'),
    activity('Hu', 'Avgang', '07:17'),
  ])
})

test('departed', () => {
  expect(train.departed([])).toEqual([])
  expect(
    train.departed([
      activity('Flb', 'Ankomst', '07:14', '07:14'),
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([activity('Flb', 'Avgang', '07:14', '07:15')])
})

test('arrived', () => {
  expect(train.arrived([])).toEqual([])
  expect(
    train.arrived([
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([])
  expect(
    train.arrived([
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([activity('Hu', 'Ankomst', '07:17', '07:17')])
})

function activity(location, activity, advertisedTime, actualTime) {
  const timeAtLocation = actualTime && `2018-02-14T${actualTime}:00`
  return {
    ActivityType: activity,
    AdvertisedTimeAtLocation: `2018-02-14T${advertisedTime}:00`,
    LocationSignature: location,
    TimeAtLocation: timeAtLocation,
  }
}
