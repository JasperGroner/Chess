/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("players", table => {
    table.string("color").notNullable().alter()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("players", table => {
    table.string("color").alter()
  })
}
