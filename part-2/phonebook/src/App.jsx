import { useState } from 'react'
import ShowFilter from './componants/ShowFilter'
import DisplayPerson from './componants/DisplayPerson'
import InputForm from './componants/InputForm'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setphoneNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

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
