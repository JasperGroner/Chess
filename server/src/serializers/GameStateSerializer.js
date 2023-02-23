import Serializer from "./Serializer.js"

class GameStateSerializer extends Serializer {
  
  static getSummary(gameStates) {
    const serializedGameStates = []
    for (const gameState of gameStates) {
      serializedGameStates.push(this.getDetail(gameState))
    }
    return serializedGameStates
  }

  static getDetail(gameState) {
    return this.serialize(gameState, ["encodedState", "createdAt"])
  }
}

export default GameStateSerializer