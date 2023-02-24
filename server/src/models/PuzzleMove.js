const Model = require("./Model.js");

class PuzzleMove extends Model {
  static get tableName() {
    return "puzzleMoves"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["moveStart", "moveEnd", "moveNumber", "gameId"],
      properties: {
        moveStart: {type: "string", minLength: 2, maxLength: 2},
        moveEnd: {type: "string", minLength: 2, maxLength: 2},
        pawnUpgrade: {type: "string", minLength: 1, maxLength: 1},
        moveNumber: {type: ["integer", "string"]},
        gameId: { type: ["integer", "string"]}
      }
    }
  }

  static get relationMappings() {
    const { Game } =  require("./index.js")

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "puzzleMoves.gameId",
          to: "games.id"
        }
      }
    }
  }
}

module.exports = PuzzleMove