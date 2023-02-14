const Model = require("./Model.js")

class Player extends Model {
  static get tableName() {
    return "players"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["color", "userId", "gameId"],
      properties: {
        color: { type: "string" },
        userId: { type: ["integer", "string"] },
        gameId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User, Game } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "players.userId",
          to: "user.id"
        }
      },

      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "players.gameId",
          to: "games.id"
        }
      }
    }
  }
}

module.exports = Player