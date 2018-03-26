import React, { Component } from 'react'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'

export default class TrainList extends Component {
  render() {
    const { onClick, stations } = this.props
    return (
      <ul>
        {this.trains().map(t => (
          <li className="train" key={id(t)} onClick={() => onClick(id(t))}>
            Tåg {id(t)} mot {destination(t)}
            <br />
            {activity(t)} {this.location(t)} kl {time(t)}
          </li>
        ))}
      </ul>
    )

    function destination(train) {
      return map(
        train.ToLocation,
        to =>
          (stations &&
            stations[to.LocationName] &&
            stations[to.LocationName].AdvertisedLocationName) ||
          to.LocationName
      ).join()
    }

    function activity(train) {
      return (
        train.ActivityType && train.ActivityType.substring(0, 3).toLowerCase()
      )
    }

    function time(train) {
      return train.TimeAtLocation && train.TimeAtLocation.substring(11, 16)
    }
  }

  trains() {
    return sortBy(this.props.trains, train => -this.north(train))
  }

  north(train) {
    const station = this.station(train.LocationSignature)
    return station ? 0 + station.north : 0
  }

  location(train) {
    const station = this.station(train.LocationSignature)
    return station ? station.AdvertisedLocationName : train.LocationSignature
  }

  station(locSig) {
    const { stations } = this.props
    return stations && stations[locSig]
  }
}

function id(train) {
  return train.AdvertisedTrainIdent || 0
}
