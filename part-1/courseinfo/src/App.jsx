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

const Content = (props) => {
  return (
    <>
      <div>
      <p>{props.part} {props.exercise}</p>
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
  const part1 = "fundamentals of react";
  const exercise1 = 10;
  const part2 = "Using props to pass data";
  const exercise2 = 7;
  const part3 = "State of a component";
  const exercise3 = 14;
  return (
    <>
      <div>
        <Header course={course}/>
        <Content part={part1} exercise={exercise1}/>
        <Content part={part2} exercise={exercise2}/>
        <Content part={part3} exercise={exercise3}/>

        <Total total={exercise1 + exercise2 + exercise3}/>
      </div>
    </>
  )
}

export default App
