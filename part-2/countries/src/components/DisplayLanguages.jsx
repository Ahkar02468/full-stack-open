const DisplayLanguages = ({ languages }) => {
     if (!languages || languages.length === 0) {
       return <p>No languages available.</p>;
     }
   
     return (
       <ul>
         {languages.map((language) => (
           <li key={language}>{language}</li>
         ))}
       </ul>
     );
   };

export default DisplayLanguages