import { useEffect, useState } from 'react'
import axios from 'axios'
import ShowFilter from './componants/ShowFilter'
import DisplayPerson from './componants/DisplayPerson'
import InputForm from './componants/InputForm'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setphoneNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log("Effect")
    axios.get("http://localhost:3001/persons")
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  },[])
  console.log("Render", persons.length, "persons.")

  const handleNewNameChange = (event) => {
      console.log(event.target.value.toUpperCase())
      setNewName(event.target.value)
  }

  const handlePhoneNumberChange  = (event) => {
    setphoneNumber(event.target.value)
  }

  const handleAddContact = (event) => {
    event.preventDefault()
    persons.map(person => {
      if(person.name === newName){
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        return
      }else{
        const newPerson = {
          name: newName,
          number: phoneNumber,
          id: persons.length + 1
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setphoneNumber(0)
      }
    })
  }

  const handleSearchTermChange  = (event) => {
    // console.log(event.target.value.toLowerCase())
    setSearchTerm(event.target.value)
  }

  const searchResults = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <ShowFilter value={searchTerm} handleOnChange={handleSearchTermChange }/>
      <h2>add a new</h2>
      <InputForm inputName={newName} inputPh={phoneNumber} handleName={handleNewNameChange} handlePh={handlePhoneNumberChange} handleSubmit={handleAddContact}/>
      <h2>Numbers</h2>
      {searchResults.map(person => (
      <DisplayPerson key={person.id} name={person.name} phone={person.number} />
    ))}
    </div>
  )
}

export default App
