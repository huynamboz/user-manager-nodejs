/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.
	createTable('messages', (table) => {
	table.increments('id');
	table.string('message');
	table.string('name');
	table.string('role');
	table.string('type');
	table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	  return knex.schema.dropTable('messages');
};
