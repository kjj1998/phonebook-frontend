import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phoneService from './services/phoneService'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearchTerm, setNewSearchTerm ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('')

  // useEffect for mocking the fetching of data from json-server
  useEffect(() => {
    phoneService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)  
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const firstElementIndex = persons.findIndex( element => element.name === newName )

    if (firstElementIndex !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneService
          .update(persons[firstElementIndex].id, nameObject)
          .then(updatedContact => {
            setPersons(persons.map(person => person.id !== persons[firstElementIndex].id ? person : updatedContact))
            
            setNotificationMessage(
              `Changed ${nameObject.name}'s number`
            )
            setNotificationType('notification')  
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType('')
            }, 5000) 
          
          })
          .catch(error => {
            setNotificationMessage(
              `${error.response.data.error}`
            )
            setNotificationType('error')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType('')
            }, 5000)
            setPersons(persons.filter(person => person.id !== persons[firstElementIndex].id))
          })
      }
    }
    else {
      phoneService
        .create(nameObject)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNotificationMessage(
            `Added ${nameObject.name}`
          )
          setNotificationType('notification')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType('')
          }, 5000)  
        })
	      .catch(error => {
          console.log(error.response.data.error)
	        setNotificationMessage(
            `${error.response.data.error}`
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType('')
          }, 5000)
	      })
        
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const deleteContact = (event, objectToBeDeleted) => {
    event.preventDefault()
    const request = phoneService.remove(objectToBeDeleted)
    
    if (request !== undefined) {
      request.then(() => {
        setPersons(persons.filter(person => person.id !== objectToBeDeleted.id))
      })
      setNotificationMessage(
        `Removed ${objectToBeDeleted.name}`
      )
      setNotificationType('notification')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType('')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={notificationMessage} type={notificationType} />
      <Filter type={'text'} value={newSearchTerm} eventHandler={handleSearchTermChange} />
      <h2>add a new</h2>
      <PersonForm submitEventHandler={addContact} name={newName} number={newNumber} nameEventHandler={handleNameChange} numberEventHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons searchedPersons={persons} searchTerm={newSearchTerm} deleteHandler={deleteContact} />
    </div>
  )
}

export default App
