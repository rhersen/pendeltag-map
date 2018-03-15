import * as filters from './filters'

test('estimated', () => {
  expect(filters.estimated([])).toEqual([])

  expect(
    filters.estimated([
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
  expect(filters.departed([])).toEqual([])
  expect(
    filters.departed([
      activity('Flb', 'Ankomst', '07:14', '07:14'),
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([activity('Flb', 'Avgang', '07:14', '07:15')])
})

test('arrived', () => {
  expect(filters.arrived([])).toEqual([])
  expect(
    filters.arrived([
      activity('Flb', 'Avgang', '07:14', '07:15'),
      activity('Hu', 'Ankomst', '07:17'),
      activity('Hu', 'Avgang', '07:17'),
    ])
  ).toEqual([])
  expect(
    filters.arrived([
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
