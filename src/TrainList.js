import React, { Component } from 'react'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'

export default class TrainList extends Component {
  render() {
    const { trains, onClick, stations } = this.props
    const sorted = sortBy(trains, train => -this.north(train))
    return (
      <ul>
        {sorted.map(t => (
          <li className="train" key={id(t)} onClick={() => onClick(id(t))}>
            Tåg {id(t)} mot {destination(t)}
            <br />
            {activity(t)} {location(t)} kl {time(t)}
          </li>
        ))}
      </ul>
    )

    function destination(train) {
      return map(train.ToLocation, to => {
        return (
          (stations &&
            stations[to.LocationName] &&
            stations[to.LocationName].AdvertisedLocationName) ||
          to.LocationName
        )
      }).join()
    }

    function activity(train) {
      return (
        train.ActivityType && train.ActivityType.substring(0, 3).toLowerCase()
      )
    }

    function location(train) {
      return (
        (stations &&
          stations[train.LocationSignature] &&
          stations[train.LocationSignature].AdvertisedLocationName) ||
        train.LocationSignature
      )
    }

    function time(train) {
      return train.TimeAtLocation && train.TimeAtLocation.substring(11, 16)
    }
  }

  north(train) {
    const { stations } = this.props
    const station = stations && stations[train.LocationSignature]
    return station ? 0 + station.north : 0
  }
}

function id(train) {
  return train.AdvertisedTrainIdent || 0
}
