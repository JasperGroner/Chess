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
}

module.exports = Game