import {useState} from 'react'

const App = () => {
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })

  // const handleLeftClicks = () => setClicks({...clicks, left: clicks.left + 1})

  // const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})

  const History = (props) => {
    if(props.allClicks.length === 0){
      return(
        <div>
          the app is used by pressing the button
        </div>
      )
    }
    return(
      <div>
        button press history: {props.allClicks.join(" ")}
      </div>
    )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const handleLeftClick = () => {   
      setAll(allClicks.concat('L'))   
      console.log("leftbefore", left)
      const updatedLeft = left + 1
      setLeft(updatedLeft)
      console.log("leftAfter", left)  
      setTotal(updatedLeft + right)
  }
  const handleRightClick = () => {    
    setAll(allClicks.concat('R'))    
    setRight(right + 1) 
    setTotal(left + right)
  }
  return (
    <div>
      {left} 
      <Button handleClick={handleLeftClick} text='left' />      
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}
export default App
