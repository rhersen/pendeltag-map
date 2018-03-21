import React from 'react'
import ReactDOM from 'react-dom'
import map from 'lodash/map'
import TrainList from './TrainList'

function items(div) {
  const root = div.querySelector('ul')
  return root.querySelectorAll('li')
}

describe('TrainList', () => {
  const train = {
    ActivityType: 'Avgang',
    AdvertisedTrainIdent: 2222,
    LocationSignature: 'Tu',
    TimeAtLocation: '2018-02-16T17:50:00',
    ToLocation: [{ LocationName: 'Mr' }],
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

  it('one train', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <TrainList
        trains={[train]}
        stations={{
          Mr: { AdvertisedLocationName: 'Märsta' },
          Tu: { AdvertisedLocationName: 'Tumba' },
        }}
      />,
      div
    )

    expect(map(items(div), 'innerHTML')).toEqual([
      'Tåg 2222 mot Märsta<br>avg Tumba kl 17:50',
    ])
  })

  it('train missing from stations', () => {
    const div = document.createElement('div')

    ReactDOM.render(<TrainList trains={[train]} stations={{}} />, div)

    expect(map(items(div), 'innerHTML')).toEqual([
      'Tåg 2222 mot Mr<br>avg Tu kl 17:50',
    ])
  })
})
