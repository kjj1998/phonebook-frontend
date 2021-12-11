import React from 'react'

const PersonForm = ({submitEventHandler, name, number, nameEventHandler, numberEventHandler}) => {
    return (
      <form onSubmit={submitEventHandler}>
          <div>
            name: <input value={name} onChange={nameEventHandler} />
          </div>
          <div>
            number: <input value={number} onChange={numberEventHandler} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm