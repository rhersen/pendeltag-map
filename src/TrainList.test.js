import React from 'react'
import ReactDOM from 'react-dom'
import map from 'lodash/map'
import TrainList from './TrainList'

function items(div) {
  const root = div.querySelector('ul')
  return root.querySelectorAll('li')
}

describe('TrainList', () => {
  const train1 = {
    ActivityType: 'Avgang',
    AdvertisedTrainIdent: 2222,
    LocationSignature: 'Tu',
    TimeAtLocation: '2018-02-16T17:50:00',
    ToLocation: [{ LocationName: 'Mr' }],
  }

  const train2 = {
    ActivityType: 'Ankomst',
    AdvertisedTrainIdent: 2223,
    LocationSignature: 'Mr',
    TimeAtLocation: '2018-02-16T17:49:00',
    ToLocation: [{ LocationName: 'Mr' }],
  }

  const stations = {
    Mr: { AdvertisedLocationName: 'Märsta', north: '59.6277190922148' },
    Tu: { AdvertisedLocationName: 'Tumba', north: '59.1994943690945' },
  }

  it('empty list', () => {
    const div = document.createElement('div')

    ReactDOM.render(<TrainList trains={[]} />, div)

    expect(items(div)).toHaveLength(0)
  })

  it('empty train', () => {
    const div = document.createElement('div')

    ReactDOM.render(<TrainList trains={[{}]} />, div)

    expect(map(items(div), 'innerHTML')).toEqual(['Tåg 0 mot <br>  kl '])
  })

  it('sorts', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <TrainList trains={[train1, train2]} stations={stations} />,
      div
    )

    expect(map(items(div), 'innerHTML')).toEqual([
      'Tåg 2223 mot Märsta<br>ank Märsta kl 17:49',
      'Tåg 2222 mot Märsta<br>avg Tumba kl 17:50',
    ])
  })

  it('train missing from stations', () => {
    const div = document.createElement('div')

    ReactDOM.render(<TrainList trains={[train1]} stations={{}} />, div)

    expect(map(items(div), 'innerHTML')).toEqual([
      'Tåg 2222 mot Mr<br>avg Tu kl 17:50',
    ])
  })
})
