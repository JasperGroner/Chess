/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("puzzleMoves", table => {
    table.bigIncrements("id")
    table.string("moveStart").notNullable()
    table.string("moveEnd").notNullable()
    table.integer("moveNumber").notNullable()
    table.bigInteger("gameId").unsigned().notNullable().index().references("games.id").onDelete("CASCADE")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("puzzleMoves")
}
