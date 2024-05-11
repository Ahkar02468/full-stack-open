import { useState } from 'react'

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad;
  if(all == 0){
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }else{
    
    let average = (props.good + props.neutral - props.bad) / 3
    let positive = props.good * (100/(props.good + props.neutral + props.bad));
    positive = positive.toString().concat('%')
    return(
      <div>
        <StatisticsLine text="good" value={props.good}/>
        <StatisticsLine text="neutral" value={props.neutral}/>
        <StatisticsLine text="bad" value={props.bad}/>
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </div>
    )
  }
}

const StatisticsLine = (props) => {
  if(props.value == 0){
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }else{
    return (
      <>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr> 
        </tbody>
      </table>
      </>
      
    )
  }

}

const Header = (props) => {
  return(
    <>
      <h1>{props.text}</h1>
    </>
  )
}

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => {
    setGood(good + 1)
  }

  const setNeutralValue = () => {
    setNeutral(neutral + 1)
  }

  const setBadValue = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGoodValue()} text='good'/>
      <Button handleClick={() => setNeutralValue()} text='nutral'/>
      <Button handleClick={() => setBadValue()} text='bad'/>
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App