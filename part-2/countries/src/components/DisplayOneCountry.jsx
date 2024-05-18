// import myImage from './path/to/your/image.jpg';
const DisplayOneCountry = (props) => {
     return (
       <div>
         <h3>Country name: {props.name}</h3>
         <p>Capital: {props.capital}</p>
         <p>Area: {props.area}</p>
         <p>Population: {props.population}</p>
         <h2>Languages:</h2>
         <ul>
           {Object.keys(props.languages).map((key) => {
             return <li key={key}>{props.languages[key]}</li>;
           })}
         </ul>
         <img src={props.flag} alt={props.name} />
       </div>
     );
   };

export default DisplayOneCountry