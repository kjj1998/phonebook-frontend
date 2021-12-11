import React from 'react'

const Persons = ({searchedPersons, searchTerm, deleteHandler}) => {
    const regex = new RegExp(searchTerm, 'i')
    return (
        <div>
            {searchedPersons
                .filter(person => {
                    if (searchTerm === '') {
                        return person;
                    } else if (regex.test(person.name) === true) {
                        return person
                    } else{
                        return null
                    }
                })
                .map(person => 
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={(event)=>deleteHandler(event, person)}>delete</button>
                    </div>)
            }
        </div>
    )
}

export default Persons