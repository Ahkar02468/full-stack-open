const CountryFIlter = (props) => {
     return(
          <div>
               <span>find countries </span>
               <input value={props.value} onChange={props.handleCountry} />
          </div>
     )
}

export default CountryFIlter