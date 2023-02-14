const Model = require("./Model.js")

class Game extends Model {
  static get tableName() {
    return "games"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "firstUserId", "firstUserColor"],
      properties: {
        name: {type: "string", minLength: 3, maxLength: 20},
        firtUserId: { type: ["string", "integer"]},
        firstUserColor: {type: "string" },
        secondUserId: { type: "string" }
      }
    }
  }
}

module.exports = Game