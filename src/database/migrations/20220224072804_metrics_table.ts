import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("metrics", (table: any) => {
    table.increments("id").primary();
    table.string("coin", 20).notNullable();
    table.string("open", 12).notNullable();
    table.string("low", 12).notNullable();
    table.string("high", 12).notNullable();
    table.string("close", 12).notNullable();
    table.dateTime("datetime").notNullable();
    table.string("periodicity", 20).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("metrics");
}
