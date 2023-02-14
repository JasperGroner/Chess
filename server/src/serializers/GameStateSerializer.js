import Serializer from "./Serializer.js"

class GameStateSerializer extends Serializer {
  static getMostRecentDetail(gameStates) {
    let latestTimestamp = 0
    let latestIndex = -1
    for (let i = 0; i < gameStates.length; i++) {
      if (gameStates[i].createdAt > latestTimestamp) {
        latestTimestamp = gameStates[i].createdAt
        latestIndex = i
      }
      console.log(latestTimestamp)
    }
    return this.getDetail(gameStates[latestIndex])
  }

  static getDetail(gameState) {
    return this.serialize(gameState, ["encodedState"])
  }
}

export default GameStateSerializer