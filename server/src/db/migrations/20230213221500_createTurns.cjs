/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("oneUserBoardStates", table => {
    table.bigIncrements("id")
    table.string("encodedState").notNullable()
    table.bigInteger("oneUserGameId").unsigned().notNullable().index().references("oneUserGames.id").onDelete("CASCADE")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTable("oneUserBoardStates")
}
