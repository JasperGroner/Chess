import React, { useState } from "react"
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewGameForm = ({setGame}) => {
  const [ name, setName ] = useState("")

  const [ errors, setErrors ] = useState({})

  const createNewGame = async(nameString) => {
    try {
      const response = await fetch("/api/v1/games/hotSeat", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({name: nameString})
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      } else {
        const body = await response.json()
        return body.game
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleNameChange = event => {
    setName(event.currentTarget.value)
  } 

  const handleSubmit = async(event) => {
    event.preventDefault()
    const gameData = await createNewGame(name)
    setGame(gameData)
  }

  return (
    <div className="centered-content">
      <h1>Add New Game</h1>
      <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
        />

        <input className="button" type="submit" value="Create New Game" />
      </form>
    </div>
  )
}

export default NewGameForm