
const Weather = ({temp, speed, weatherIcon}) => {
     const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
     return (
          <>
               <p>Temperature: {temp}°C</p>
               <img src={iconUrl}/>
               <p>Wind: {speed} m/s</p>
          </>
     )
}

export default Weather