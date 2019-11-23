exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .string("projectName")
        .notNullable()
        .unique();
      tbl.string("description");
      tbl.binary("completed").defaultTo(false);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .integer("projectId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("description").notNullable();
      tbl.string("notes");
      tbl.binary("completed").defaultTo(false);
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl.string("resourceName").notNullable();
      tbl.string("description");
    })
    .createTable("projects_resources", tbl => {
      tbl
        .integer("projectId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("resourceId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["projectId", "resourceId"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
