const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you're {props.age} year old.</p>
    </div>
  )
}

const App = () => {
  // const name = "Peter";
  // const age = 23;
  const friends = ["Peter", "John"]
  
  return (
    <div>
      <h1>Greeting</h1>
      <p>{friends}</p>
    </div>
  )
}

export default App