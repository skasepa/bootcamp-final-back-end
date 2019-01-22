exports.up = function(knex, Promise) {
  return knex.schema.table('drinks', table => {
    table.specificType('coordinates', 'GEOMETRY').notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('drinks', table => {
    table.dropColumn('coordinates')
  })
}
