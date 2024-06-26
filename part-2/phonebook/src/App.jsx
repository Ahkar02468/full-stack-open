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

  const updatePerson = (person) => {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the number?`)
    if (ok) {
      
      server.update(person.id, {...person, number: phoneNumber}).then((updatedPerson) => {
        setPersons(persons.map(p => p.id !== person.id ? p :updatedPerson ))
        setNewName('')
        setphoneNumber('')
        setMessage(`Phone number of '${person.name}' is changed...`)
        setTimeout(() => {
                  setMessage('')
                }, 5000)
      })
      .catch(() => {
        setMessage(`${person.name} has already been removed`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handleAddContact = (event) => {
      event.preventDefault()
      if(newName.length <= 3){
        setErrorMessage('Name lenght must be grater than 3')
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
        return
      }
      const person = persons.find(p => p.name === newName)

      if (person) {
        updatePerson(person)
        return
      }

      const newPerson = {
        name: newName,
        number: phoneNumber
      }
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
      .catch(error => console.log(error.response.data.error))
    }
  // }

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
    .catch(() => {

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
      <ShowFilter value={searchTerm} handleOnChange={handleSearchTermChange}/>
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
