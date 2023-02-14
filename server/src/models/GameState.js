const Model = require("./Model.js")

class GameState extends Model {
  static get tableName() {
    return "gameStates"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["encodedState", "gameId"],
      properties: {
        encodedState: { type: "string" },
        gameId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { Game } = require("./index.js")

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "gameStates.gameId",
          to: "games.id"
        }
      }
    }
  }
}

module.exports = GameState