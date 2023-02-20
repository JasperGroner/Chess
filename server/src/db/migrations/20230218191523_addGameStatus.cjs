/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("games", table => {
    table.string("status").notNullable().defaultTo("paused")
    table.string("winner")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("games", table => {
    table.dropColumn("status")
    table.dropColumn("winner")
  })
}
