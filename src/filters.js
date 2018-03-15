import filter from 'lodash/filter'
import includes from 'lodash/includes'
import map from 'lodash/map'
import reject from 'lodash/reject'

export function estimated(train) {
  return reject(train, 'TimeAtLocation')
}

export function departed(train) {
  return filter(filter(train, { ActivityType: 'Avgang' }), 'TimeAtLocation')
}

export function arrived(train) {
  const departed = filter(train, 'TimeAtLocation')
  const departures = map(
    filter(departed, { ActivityType: 'Avgang' }),
    'LocationSignature'
  )
  return reject(departed, a => includes(departures, a.LocationSignature))
}
