const Total = ({ parts }) => {
     const total = parts.reduce((sum, part) => sum + part.exercises, 0)
     return (
       <h3><b>Number of exercises {total}</b></h3>
     )
   }

export default Total