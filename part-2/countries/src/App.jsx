import { useEffect, useState } from 'react'
import server from './server/action'
import CountryFilter from './components/CountryFIlter'
import DisplayCountry from './components/DisplayCountry'
import DisplayOneCountry from './components/DisplayOneCountry'

function App() {
  const [filterCountry, setfilterCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCount, setSearchResultsCount] = useState(0);

  useEffect(() => {
      server.getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
    },[])

  const handleFilterCountry = (event) => {
    event.preventDefault()
    setfilterCountry(event.target.value)
  }


  useEffect(() => {
    const results = countries.filter(country => country.name.common && country.name.common.toLowerCase().includes(filterCountry.toLowerCase()));
    setSearchResults(results);
    setSearchResultsCount(results.length);
  }, [countries, filterCountry]);

  // console.log(countries)

  if(searchResultsCount > 10){
    return (
      <>
      <CountryFilter value={filterCountry} handleCountry={handleFilterCountry}/>

      <h3>Too many matches, specify another filter.</h3>
    </>
    )
  }else if(searchResultsCount > 1 && searchResultsCount < 10){
    return (
      <>
        <CountryFilter value={filterCountry} handleCountry={handleFilterCountry}/>
  
        {searchResults.map(country => (
        <DisplayCountry key={country.name.common} name={country.name.common} />
      ))}
      </>
    )
  }else{
    return (
      <>
        <CountryFilter value={filterCountry} handleCountry={handleFilterCountry}/>
  
        {searchResults.map(country => (
        <DisplayOneCountry key={country.name.common} 
                            name={country.name.common} 
                            capital={country.capital} 
                            area={country.area}
                            flag={country.flags.png}
                            population={country.population}
                            languages={country.languages}
                            />
      ))}
      </>
    )
  }
}

export default App
