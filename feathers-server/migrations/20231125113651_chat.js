export async function up(knex) {
  // await knex.schema.alterTable('users', (table) => {
  //   table.string('avatar')
  // })

  await knex.schema.alterTable('messages', (table) => {
    table.bigint('createdAt')
    table.bigint('userId')
    // table.bigint('userId').references('id').inTable('users')
  })
}

export async function down(knex) {
//   await knex.schema.alterTable('users', (table) => {
//     table.dropColumn('avatar')
//   })

  await knex.schema.alterTable('messages', (table) => {
    table.dropColumn('createdAt')
    table.dropColumn('userId')
  })
}