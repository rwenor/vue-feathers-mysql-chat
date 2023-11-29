
# Knex debugging

  "mysql": {
    "debug": true,
    "client": "mysql",
    "connection": "mysql://root:ax@localhost:3306/feathersdb"
  }

# Run knex from npm
npm exec knex migrate:latest
npm exec knex migrate:up
npm exec knex migrate:down

## https://knexjs.org/guide/migrations.html#migration-cli
npm exec knex migrate:down 001_migration_name.js
npm exec knex migrate:rollback --all
npm exec knex migrate:rollback
