import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <div>
        <h1>{props.course}</h1>
      </div>
    </>
  )
}

const Part = (part) => {
  console.log(part.name);
  return (
    <p>{part.name} {part.exercises}.</p>
  )
}

const Content = (parts) => {
  // console.log(parts.part1.name);
  return (
    <>
      <div>
        <Part name={parts.part1.name} exercises={parts.part1.exercises}/>
        <Part name={parts.part2.name} exercises={parts.part2.exercises}/>
        <Part name={parts.part3.name} exercises={parts.part3.exercises}/>
        {/* <Part part={parts[1].part2}/>
        <Part part={parts[2].part3}/> */}
      </div>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <div>
        <p>Number of exercise {props.total}.</p>
      </div>
    </>
  )
}

const App = () => {
  const course = "Half stack application development.";
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  // console.log(partsAndExercises[0].part1);
  // console.log(partsAndExercises[0].exercise1);
  return (
    <>
      <div>
        <Header course={course}/>
        <Content part1={part1} part2={part2} part3={part3}/>

        <Total total={part1.exercises + part2.exercises + part3.exercises}/>
      </div>
    </>
  )
}

export default App
