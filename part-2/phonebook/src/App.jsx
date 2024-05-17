import { useEffect, useState } from 'react'
import server from './services/server'
import ShowFilter from './componants/ShowFilter'
import DisplayPerson from './componants/DisplayPerson'
import InputForm from './componants/InputForm'
import Message from './componants/Message'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [errorMesage, setErrorMessage] = useState('')

  useEffect(() => {
    server.getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  },[])

  const handleNewNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handlePhoneNumberChange  = (event) => {
    setphoneNumber(event.target.value)
  }

  const checkName = (name) => {
    return persons.find(person => person.name.toLowerCase() === name.toLowerCase())
  }

  const handleAddContact = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: phoneNumber
    }
   
    const existingPerson = checkName(newName)
    
    const changedPerson = { ...existingPerson, number:phoneNumber}

    // console.log("existingPerson: ", existingPerson)
    // console.log("changedPerson: ", changedPerson)

    if(existingPerson && (existingPerson.number !== changedPerson.number)){
      if(confirm(`${newName} is already added to phonebook, replace old number with the new one?`)){
        server.update(existingPerson.id, changedPerson)
        .then((returnObject) => {
          console.log("Retuen obj: ",returnObject)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnObject))
          setNewName('')
          setphoneNumber('')
          setMessage(`Phone number of '${newName}' is changed...`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
      }
    }else if(existingPerson && (existingPerson.number === changedPerson.number)){
      alert(`${newName} is already added to phonebook`)
    }else{
      server.create(newPerson)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setMessage(`Person name of '${newName}' is added...`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        setNewName('')
        setphoneNumber('')
      })
    }
  }

  const handleSearchTermChange  = (event) => {
    setSearchTerm(event.target.value)
  }

  const deletePerson = (person) => {
   if( confirm(`Are you sure you want to delete ${person.name}.`)){
    server.remove(person.name, person.id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== person.id))
      setMessage(`Name '${person.name}' is deleted...`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
    })
    .catch(error => {

      setErrorMessage(
        `Person '${person.name}' was already removed from server..`
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setPersons(persons.filter(p => p.id !== person.id))
    })
   }
  }

  const searchResults = persons.filter(person => person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type='success'/>
      <Message message={errorMesage} type='error'/>
      <ShowFilter value={searchTerm} handleOnChange={handleSearchTermChange }/>
      <h2>add a new</h2>
      <InputForm inputName={newName} inputPh={phoneNumber} handleName={handleNewNameChange} handlePh={handlePhoneNumberChange} handleSubmit={handleAddContact}/>
      <h2>Numbers</h2>
      {/* {setMessage(null)} */}
      {searchResults.map(person => (
      <DisplayPerson key={person.id} name={person.name} phone={person.number} handleDelete={() => deletePerson(person)} />
    ))}
    </div>
  )
}

export default App
