import React, { Component } from 'react'
import filter from 'lodash/filter'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import map from 'lodash/map'
import maxBy from 'lodash/maxBy'
import './App.css'
import Map from './Map'
import TrainList from './TrainList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: {},
      selectedTrain: 0,
      train: [],
      trains: [],
    }
  }

  componentDidMount() {
    this.getStations()
    this.getTrains()
  }

  getStations() {
    const xhr = new XMLHttpRequest()
    xhr.onload = () =>
      this.setState({
        stations: keyBy(JSON.parse(xhr.response), 'LocationSignature'),
      })

    xhr.open('GET', '/json/pendel', true)
    xhr.send()
  }

  getTrains() {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      const [message] = JSON.parse(xhr.response).RESPONSE.RESULT
      this.setState({
        trains: map(
          groupBy(
            filter(message.TrainAnnouncement, 'TimeAtLocation'),
            'AdvertisedTrainIdent'
          ),
          group => maxBy(group, 'TimeAtLocation')
        ),
      })
    }

    xhr.open('GET', '/json/current', true)
    xhr.send()
  }

  getTrain(id) {
    const xhr = new XMLHttpRequest()
    xhr.onload = () =>
      this.setState({
        train: JSON.parse(xhr.response).RESPONSE.RESULT[0].TrainAnnouncement,
      })

    xhr.open('GET', `/json/train/${id}`, true)
    xhr.send()
  }

  render() {
    const { stations, selectedTrain, train, trains } = this.state
    return (
      <div className="App">
        {selectedTrain ? (
          !train.length ? (
            <div>selected {selectedTrain}</div>
          ) : (
            <Map
              stations={stations}
              train={train}
              back={() => {
                this.setState({ selectedTrain: 0 })
              }}
            />
          )
        ) : trains.length ? (
          <TrainList
            stations={stations}
            trains={trains}
            onClick={id => {
              this.setState({ selectedTrain: id })
              this.getTrain(id)
            }}
          />
        ) : (
          <div>?</div>
        )}
      </div>
    )
  }
}

export default App
