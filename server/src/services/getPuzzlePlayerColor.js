const getPuzzlePlayerColor = async game => {
  const gameStates = await game.$relatedQuery("gameStates")
  const encodedState = gameStates[0].encodedState
  const computerColor = encodedState.split(" ")[1]
  return computerColor === "w" ? "black" : "white"
}

export default getPuzzlePlayerColor