import Part from "./Part"
const Content = ({ parts }) =>
     <>
       {parts.map(part => (<Part part={part.name} exercise={part.exercises} key={part.id}/>))}
     </>

export default Content