import React, { Component } from 'react'
import map from 'lodash/map'

export default class TrainList extends Component {
  render() {
    const { trains, onClick } = this.props
    return (
      <ol>
        {trains.map(t => (
          <li key={id(t)} onClick={() => onClick(id(t))}>
            Tåg {id(t)} mot {this.destination(t)} {this.activity(t)}{' '}
            {this.location(t)} klockan {this.time(t)}
          </li>
        ))}
      </ol>
    )
  }

  destination(train) {
    return map(train.ToLocation, 'LocationName').join()
  }

  activity(train) {
    return train.ActivityType
  }

  location(train) {
    return train.LocationSignature
  }

  time(train) {
    return train.TimeAtLocation
  }
}

function id(train) {
  return train.AdvertisedTrainIdent
}
