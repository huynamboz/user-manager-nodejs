/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.alterTable('users', function(table) {
		// dropColumn status_active if exists
		table.dropColumn('status_active');
		// addColumn status_active with default value fasle not o 1
		table.boolean('status_active').defaultTo(false);
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable('users', function(table) {
		table.dropColumn('status_active');
	})
};
