import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from './Weather'

const DisplayOneCountry = (props) => {
  const [temperature, setTemperature] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState('');
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const apiKey = import.meta.env.VITE_API_KEY
  const capital = props.capital

  useEffect(() => {
    // console.log(`${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`)
       axios.get(`${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`)
       .then(respose => {
            // setWeather(resposeData.data)
            // console.log(temperature)
            setTemperature(respose.data.main)
            setWindSpeed(respose.data.wind)
            setWeatherIcon(respose.data.weather[0].icon)
       }).catch(err => console.log(err))
  },[])
    const languages = props.languages
    const languageKeys = Object.keys(languages);
     
     return (
       <div>
         <h3>Country name: {props.name}</h3>
         <p>Capital: {props.capital}</p>
         <p>Area: {props.area}</p>
         <p>Population: {props.population}</p>
         <h2>Languages: </h2>
         <ul>
            {languageKeys.map((languageCode) => (
              <li key={languageCode}>
                {languages[languageCode]}
              </li>
            ))}
        </ul>
         <img src={props.flag} alt={props.name} />
         <h2>Weather in {capital}</h2>
         <Weather temp={temperature.temp} speed={windSpeed.speed} weatherIcon={weatherIcon}/>
       </div>
     )
   }

export default DisplayOneCountry