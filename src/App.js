import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosenType, setChosenType] = useState(null);
  const [chosenMag, setChosenMag] = useState(null);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [chosenDateRange, setChosenDateRange] = useState(null);
  const [chosenSortOption, setChosenSortOption] = useState(null);
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3000/results',
      params: {
        type: chosenType,
        mag: chosenMag,
        location: chosenLocation,
        dateRange: chosenDateRange,
        sortOption: chosenSortOption
      }
    }
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>Earthquake Watcher</li>
        </ul>
      </nav>

      <p className='directions'>
        {' '}
        Search for earthquakes using the following criteria:
      </p>

      <div className='main'>
        <div className='type-selector'>
          <ul>
            <li>
              <select
                name='types'
                id='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}
              >
                <option value={null}>Select Type</option>
                <option value='earthquake'>Earthquake</option>
                <option value='quarry blast'>Quarry Blast</option>
                <option value='ice quake'>Ice Quake</option>
                <option value='explosion'>Explosion</option>
              </select>
            </li>
            <li>
              <select
                name='mag'
                id='mag'
                value={chosenMag}
                onChange={(e) => setChosenMag(e.target.value)}
              >
                <option value={null}>Select Magnitude Level</option>
                <option value='2.5'>2.5+</option>
                <option value='5.5'>5.5+</option>
                <option value='6.1'>6.1+</option>
                <option value='7'>7+</option>
                <option value='8'>8+</option>
              </select>
            </li>
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Enter Area of Interest'
                    value={chosenLocation}
                    onChange={(e) => setChosenLocation(e.target.value)}
                  ></input>
                </label>
              </form>
            </li>
            <li>
              <select
                name='dateRange'
                id='dateRange'
                value={chosenDateRange}
                onChange={(e) => setChosenDateRange(e.target.value)}
              >
                <option value={null}>Select Date Range</option>
                <option value='7'>7</option>
                <option value='14'>14</option>
                <option value='21'>21</option>
                <option value='30'>30</option>
              </select>
            </li>
            <li>
              <select
                name='sortOption'
                id='sortOption'
                value={chosenSortOption}
                onChange={(e) => setChosenSortOption(e.target.value)}
              >
                <option value={null}>Sort By</option>
                <option value='desc'>Largest Magnitude First</option>
                <option value='asc'>Smallest Magnitude First</option>
              </select>
            </li>
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results'>
            {(documents.length > 0) ? (
              <p>Number of relevant earthquake-related documents retrieved: {documents.length}</p>
            ) : (
              <p>Uh oh! No relevant earthquake-related documents were found!</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>Type: {document._source.type}</p>
                  <p>Time: {document._source['@timestamp']}</p>
                  <p>Location: {document._source.place}</p>
                  <p>Latitude: {document._source.coordinates.lat}</p>
                  <p>Longitude: {document._source.coordinates.lon}</p>
                  <p>Magnitude: {document._source.mag}</p>
                  <p>Depth: {document._source.depth}</p>
                  <p>Significance: {document._source.sig}</p>
                  <p>Event URL: {document._source.url}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App;