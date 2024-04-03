import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Charlotte'); // Default location set to 'Charlotte'
  const [isCelsius, setIsCelsius] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []); // Run only once when component mounts

  const fetchData = () => {
    axios.get(buildUrl()).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const buildUrl = () => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${isCelsius ? 'metric' : 'imperial'}&appid=320383e72a43e611f0d9f8621cb1e811`;
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="app">
      <img src="/weather-react-main/public/assets/Logo_Weather.png" alt="Logo" class="logo"></img>
      <div className="search-container">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="weather-info">
        <div className="header-container">
          <div className="location-date-container">
            <div className="location">{data?.name} </div> 
            <div className="date">{new Date().toDateString()}</div>
            <div className="button1"><button onClick={toggleUnit} className={isCelsius ? 'fahrenheit' : 'celsius'}>
          {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </button></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="temp-left">
          <div className="temp">
            {data.main ? (
              <>
                {data.weather ? (
                  <img
                    className="weather-icon"
                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    alt="icon"
                  />
                ) : null}
                <h1>{isCelsius ? ((data.main.temp - 32) * 5 / 9).toFixed() : data.main.temp.toFixed()}°{isCelsius ? 'C' : 'F'}</h1>
              </>
            ) : null}
          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className="dashboard">
          <div className="temp_min">
            {data.main ? <h1>{isCelsius ? ((data.main.temp_min - 32) * 5 / 9).toFixed() : data.main.temp_min.toFixed()}°{isCelsius ? 'C' : 'F'}</h1> : null}
            <h2>Low</h2>
          </div>
          <div className="temp_max">
            {data.main ? <h1>{isCelsius ? ((data.main.temp_max - 32) * 5 / 9).toFixed() : data.main.temp_max.toFixed()}°{isCelsius ? 'C' : 'F'}</h1> : null}
            <h2>High</h2>
          </div>
          <div className="humidity">
            {data.main ? <h1>{data.main.humidity.toFixed()}%</h1> : null}
            <h2>Humidity</h2>
          </div>
          <div className="wind">
            {data.wind ? <h1>{data.wind.speed.toFixed()} MPH</h1> : null}
            <h2>Wind</h2>
          </div>
          <div className="feels_like">
            {data.main ? <h1>{isCelsius ? ((data.main.feels_like - 32) * 5 / 9).toFixed() : data.main.feels_like.toFixed()}°{isCelsius ? 'C' : 'F'}</h1> : null}
            <h2>Feels Like</h2>
          </div>
          <div className="pressure">
            {data.main ? <h1>{data.main.pressure}</h1> : null}
            <h2>Pressure</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
