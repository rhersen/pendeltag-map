import React, { Component } from 'react'
import map from 'lodash/map'
import * as filters from './train'
import * as classes from './classes'

export default class Map extends Component {
  render() {
    const { stations, train, back } = this.props
    return (
      <svg id="map" className="App-logo" viewBox="173 0 10 16">
        <g>
          <circle onClick={back} className="back" cx="182" cy="1" />
          {map(stations, (v, k) => (
            <text className="location" key={k} x={x(v)} y={y(v)} fontSize="0.3">
              {k}
            </text>
          ))}
          {map(filters.estimated(train), a => {
            console.log('estimated', a.ActivityType, a.LocationSignature)
            const v = stations[a.LocationSignature]
            const k = a.ActivityType + a.LocationSignature
            return <circle className="estimated" key={k} cx={x(v)} cy={y(v)} />
          })}
          {map(filters.departed(train), a => {
            console.log('departed', a.ActivityType, a.LocationSignature)
            const v = stations[a.LocationSignature]
            const k = a.ActivityType + a.LocationSignature
            return (
              <circle
                className={classes.delay(a)}
                key={k}
                cx={x(v)}
                cy={y(v)}
              />
            )
          })}
          {map(filters.arrived(train), a => {
            console.log('arrived', a.ActivityType, a.LocationSignature)
            const v = stations[a.LocationSignature]
            const k = a.ActivityType + a.LocationSignature
            return (
              <circle
                className={`arrived ${classes.delay(a)}`}
                key={k}
                cx={x(v)}
                cy={y(v)}
              />
            )
          })}
        </g>
      </svg>
    )
  }
}

function x(v) {
  return v.east * 10
}

function y(v) {
  return (60 - v.north) * 14
}
