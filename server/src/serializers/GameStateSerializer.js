import Serializer from "./Serializer.js"

class GameStateSerializer extends Serializer {
  static getDetail(gameState) {
    return this.serialize(gameState, ["encodedState"])
  }
}

export default GameStateSerializer