import React, { Component } from 'react'
import map from 'lodash/map'
import * as filters from './filters'
import * as classes from './classes'
import zoom from './zoom'

export default class Map extends Component {
  render() {
    const { stations, train, isFull } = this.props
    const { viewBox, yScale } = zoom(isFull)

    return (
      <svg id="map" className="App-logo" viewBox={viewBox}>
        <g>
          {map(stations, (v, k) => (
            <text className="location" key={k} x={x(v)} y={y(v)} fontSize="0.3">
              {k}
            </text>
          ))}
          {map(filters.estimated(train), a => {
            const v = stations[a.LocationSignature]
            const k = a.ActivityType + a.LocationSignature
            return <circle className="estimated" key={k} cx={x(v)} cy={y(v)} />
          })}
          {map(filters.departed(train), a => {
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

    function x(v) {
      return v.east * 10
    }

    function y(v) {
      return (60 - v.north) * yScale
    }
  }
}
