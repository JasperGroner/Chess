const Model = require("./Model.js")

class OneUserGame extends Model {
  static get tableName() {
    return "oneUserGames"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "userId"],
      properties: {
        name: {type: "string", minLength: 3, maxLength: 20},
        userId: { type: ["string", "integer"]}
      }
    }
  }
}

module.exports = OneUserGame