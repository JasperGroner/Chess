const Model = require("./Model.js")

class Game extends Model {
  static get tableName() {
    return "games"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "gameType"],
      properties: {
        name: {type: "string", minLength: 3, maxLength: 20},
        gameType: {type: "string"}
      }
    }
  }

  static get relationMappings() {
    const { GameState, Player, User } = require("./index.js")

    return {
      gameStates: {
        relation: Model.HasManyRelation,
        modelClass: GameState,
        join: {
          from: "games.id",
          to: "gameStates.gameId"
        }
      },

      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: "games.id",
          to: "players.gameId"
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "games.id",
          through: {
            from: "players.gameId",
            to: "players.userId"
          },
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Game