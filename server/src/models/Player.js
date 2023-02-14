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
}

module.exports = Player