/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("games", table => {
    table.string("status").notNullable().alter()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("games", table => {
    table.string("status").notNullable().defaultTo("paused").alter()
  })
}
