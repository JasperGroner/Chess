/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("puzzleMoves", table => {
    table.string("pawnUpgrade")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("puzzleMoves", table => {
    table.dropColumn("pawnUpgrade")
  })
}
