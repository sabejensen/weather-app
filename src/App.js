import React, { useState, useEffect } from 'react'
import './App.css';

import MapSelection from './components/MapSelection/index'

function App() {
  const [currentLng, setCurrentLng] = useState(-111.86)
  const [currentLat, setCurrentLat] = useState(40.55)
  
  const [unit, setUnit] = useState('imperial')
  const unitStyle = {backgroundColor: '#000', color: '#fff'}

  const [forecast, setForecast] = useState(false)

  const countArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const countArray2 = [1, 2, 3, 4, 5, 6, 7]

  const refreshForecast = async () => {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat.toString() + '&lon=' + currentLng.toString() + '&appid=60e806425103fe7664141785c6679a6d&units=' + unit
    console.log('URL ', url)
    await fetch(url)
    .then(res => res.json())
    .then(data => setForecast(data));
  }

  const hourForecast = () => {
    let myDate = new Date()
    myDate = myDate.getHours()
    let hourArray = []
    for(let i = 0; i < 24; i++) {
      let now = myDate + i
      if(now > 23) {
        now = now - 24
      }
      if(now < 10) {
        now.toString()
        now = '0' + now + '00'
      } else {
        now.toString()
        now = now + '00'
      }
      hourArray.push(now)
    }
    return hourArray
  }

  const dayForecast = () => {
    let myDate = new Date()
    myDate = myDate.getDay()
    let dayArray = []
    let dayData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    for(let i = 0; i < 7; i++) {
      let today = myDate + i - 1
      if(today > 6) {
        today = today - 7
      }
      dayArray.push(dayData[today])
    }
    return dayArray
  }

  useEffect(() => {
    refreshForecast()
  }, [currentLat]);

  useEffect(() => {
    refreshForecast()
  }, [unit]);

  useEffect(() => {
    console.log(forecast)
  }, [forecast]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <h3>Select Format</h3>
        <div 
          className="temp-select"
          onClick={() => {
            if(unit == 'imperial') {
              setUnit('metric')
            } else {
              setUnit('imperial')
            }
          }}
        >
          <div style={unit == 'imperial' ? unitStyle : null}><p>F</p></div>
          <div style={unit == 'metric' ? unitStyle : null}><p>C</p></div>
        </div>
        <h3>Select Location</h3>
        <MapSelection setCurrentLng={setCurrentLng} setCurrentLat={setCurrentLat} />
        <h2>Forecast</h2>
        {forecast ? 
          <div>
            <p>Current Weather: {forecast.current.temp}&#730;{unit == 'imperial' ? 'F' : 'C'} {forecast.current.weather[0].main}</p>
            <h4>Hourly Forecast: </h4>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
            {countArray.map((value, index) => {
              let hours = hourForecast()
              return <li key={index} style={{display: 'flex', justifyContent: 'space-between', maxWidth: '40%', margin: 'auto'}}><span>{hours[index]}:</span> {forecast.hourly[index].temp}&#730;{unit == 'imperial' ? 'F' : 'C'} {forecast.hourly[index].weather[0].main}</li>
            })}
            </ul>
            <h4>Daily Forecast:</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>{countArray2.map((value, index) => {
              let days = dayForecast()
              return <div key={index} className="day-card"><p>{days[index]}</p><p>{forecast.daily[index].temp.day}&#730;{unit == 'imperial' ? 'F' : 'C'}</p><p>{forecast.daily[index].weather[0].main}</p></div>
            })}</div>
          </div> 
        : null}
      </header>
    </div>
  );
}

export default App;
