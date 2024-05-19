import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFIlter'
import DisplayCountry from './components/DisplayCountry'
function App() {
  const [filterCountry, setfilterCountry] = useState('')
  const [countries, setCountries] = useState([])

  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios.get(baseURL)
        .then(response => setCountries(response.data))
    },[])

  const handleFilterCountry = (event) => {
    event.preventDefault()
    setfilterCountry(event.target.value)
  }

  if(!filterCountry){
    return(
      <>
        <CountryFilter value={filterCountry} handleCountry={handleFilterCountry}/>
        <h3>Type name of country to search...</h3>
      </>
    )
  }

  const filteredCountry = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  return (
    <>
     <CountryFilter value={filterCountry} handleCountry={handleFilterCountry}/>
     <DisplayCountry filteredCountry={filteredCountry}/> 
    </>
  )
}

export default App
