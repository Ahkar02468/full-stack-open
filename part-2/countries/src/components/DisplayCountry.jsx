
import DisplayOneCountry from './DisplayOneCountry'
const DisplayCountry = ({filteredCountry}) => {

     if(filteredCountry.length > 10){
          return <h3>Too many matches, specify another filter..</h3>
     }
     if(filteredCountry.length < 10 && filteredCountry.length > 1){
          return (
               <div>
                    <h3>{filteredCountry.map(country => <div key={country.name.common}>{country.name.common}</div>)}</h3>
               </div>
          )
     }
     if(filteredCountry.length === 1){
          return(
               <>
                    <DisplayOneCountry name={filteredCountry[0].name.common} 
                                  flag={filteredCountry[0].flags.png} 
                                  capital={filteredCountry[0].capital[0]} 
                                  area={filteredCountry[0].area} 
                                  population={filteredCountry[0].population} 
                                  languages={filteredCountry[0].languages}
                                  />
               </>
          )
     }
}

export default DisplayCountry