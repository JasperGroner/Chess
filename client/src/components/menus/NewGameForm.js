import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../layout/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const NewGameForm = props => {
  const { currentUser } = props

  if ( currentUser === null) {
    return <Redirect to="/user-sessions/new"/>
  }

  const gameType = props.location.state.gameType

  const [ name, setName ] = useState("")
  const [ color, setColor ] = useState(gameType === "hot seat" ? "both" : "white")
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ game, setGame ] = useState({})
  const [ errors, setErrors ] = useState({})
  
  const changeColor = event => {
    setColor(event.currentTarget.value)
  }

  let pathname, colorChoice

  if (gameType === "hot seat") {
    pathname = "/chess"
  } else {
    pathname = "/lobby"
    colorChoice = (
      <fieldset>
        <legend className="main-menu--item">Select Your Color</legend>
        <input type="radio" id="white" name="color" value="white" onChange={changeColor} checked={color==="white"}/>
        <label htmlFor="white" className="main-menu--choice">White</label>
        <input type="radio" id="black" name="color" value="black" onChange={changeColor} checked={color==="black"}/>
        <label htmlFor="black" className="main-menu--choice">Black</label>
      </fieldset>
    )
  }

  if (shouldRedirect) {
    return (
      <Redirect to={{
        pathname: pathname,
        state: { 
          game: game,
          color: color
        }
      }}/>
    )
  }

  const createNewGame = async (nameString) => {
    try {
      const response = await fetch(`/api/v1/games/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({game: {name: nameString, gameType}, color})
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const gameData = await createNewGame(name)
    if(gameData) {
      setGame(gameData)
      setShouldRedirect(true)
    }
  }

  return (
    <div className="sub-page-container">
      <div className="centered-content">
        <h1 className="main-menu--header">Add New Game</h1>
        <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />
          <label htmlFor="name" className="main-menu--item">Name</label>
          <input 
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />

          {colorChoice}

          <input className="button" type="submit" value="Create New Game" />
        </form>
      </div>
    </div>
  )
}

export default NewGameForm