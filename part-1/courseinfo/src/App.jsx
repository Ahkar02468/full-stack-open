import { useState } from 'react'

const Header = ({course}) => {
  return (
    <>
      <div>
        <h1>{course.name}</h1>
      </div>
    </>
  )
}

const Part = (part) => {
  // console.log(part.name);
  return (
    <p>{part.name} {part.exercises}.</p>
  )
}

const Content = ({course}) => {
  // console.log(parts[0].name);
  const [part1, part2, part3] = course.parts;
  // console.log(first);
  // console.log(second);
  // console.log(thiird);
  return (
    <>
      <div>
        <Part name={part1.name} exercises={part1.exercises} />
        <Part name={part2.name} exercises={part2.exercises} />
        <Part name={part3.name} exercises={part3.exercises} />
      </div>
    </>
  )
}

const Total = ({course}) => {
  const [part1, part2, part3] = course.parts;
  // console.log(part1);
  // console.log(part2);
  // console.log(part3);
  return (
    <>
      <div>
        <p>Number of exercise {part1.exercises + part2.exercises + part3.exercises}.</p>
      </div>
    </>
  )
}

const App = () => {
  const course = {
    name: "Half stack application development.",
    parts: [
    
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  // console.log(parts[0].name);
  // console.log(partsAndExercises[0].part1);
  // console.log(partsAndExercises[0].exercise1);
  return (
    <>
      <div>
        <Header course={course}/>
        <Content course={course}/>

        <Total course={course}/>
      </div>
    </>
  )
}

export default App
