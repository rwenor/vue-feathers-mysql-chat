export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('name')
    table.string('password')
    table.string('githubId')
    table.string('accessLevelId')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
