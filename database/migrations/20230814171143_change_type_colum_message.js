/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.alterTable('messages', function(table) {
		// change column message to type nvarchar(max)
		table.string('message', 1000).alter();
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable('messages', function(table) {
		// change column message to type nvarchar(255)
		table.string('message', 255).alter();
	})
};
