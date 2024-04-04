import {useState} from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick,text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log("Rendering with counuter value", counter)
  const increaseByOne = () => {
    console.log("Increasing, value before ", counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log("Decreasing, value before ", counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log("Resetting to zero, value before ", counter)
    setCounter(0)
  }
  const increaseByTwo = () => {
    setCounter(counter + 2)
  }
  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text="Plus" />
      <Button onClick={setToZero} text="Zero"/>
      <Button onClick={decreaseByOne} text= "Minus"/>
      <Button onClick={increaseByTwo} text="Plus Two"/>
    </div>
  )
}
export default App
