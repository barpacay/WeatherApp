import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=320383e72a43e611f0d9f8621cb1e811
  `

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <img src="/weather-react-main/src/assets/Logo_Weather.png" alt="Logo" class="logo"></img>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="weather">
          {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="icon" /> : null}
          {new Date().toDateString()}
          <h1>{data?.name}</h1>
        </div>
        <div className="dashboard">
        <div className="temp_min">
            {data.main ? <h1>{data.main.temp_min.toFixed()}°F</h1> : null}
            <h2>Low</h2>
          </div>
          <div className="temp_max">
            {data.main ? <h1>{data.main.temp_max.toFixed()}°F</h1> : null}
            <h2>High</h2>
          </div>
          <div className="humidity">
            {data.main ? <h1>{data.main.humidity.toFixed()}%</h1> : null}
            <h2>Humidity</h2>
          </div>
          <div className="wind">
            {data.main ? <h1>{data.wind.speed.toFixed()} MPH </h1> : null}
            <h2>Wind</h2>
          </div>
          <div className="feels_like">
            {data.main ? <h1>{data.main.feels_like.toFixed()}°F</h1> : null}
            <h2>Feels Like</h2>
          </div>
          <div className="pressure">
            {data.main ? <h1>{data.main.pressure} </h1> : null}
            <h2>Pressure</h2>
          </div>
        </div>
        <div className="top">

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
