const Model = require("./Model.js")

class Game extends Model {
  static get tableName() {
    return "games"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: "string", minLength: 3, maxLength: 20}
      }
    }
  }

  static get relationMappings() {
    const { GameState } = require("./index.js")

    return {
      gameStates: {
        relation: Model.HasManyRelation,
        modelClass: GameState,
        join: {
          from: "games.id",
          to: "gameStates.gameId"
        }
      }
    }
  }
}

module.exports = Game