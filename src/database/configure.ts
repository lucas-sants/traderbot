import { knexSnakeCaseMappers, Model } from "objection";
import Knex from "knex";

export const knexConfig = {
  client: "mysql2",
  connection: process.env.DB_URL,
  migrations: {
    extension: "ts",
    tableName: "knex_migrations",
    directory: "./src/database/migrations",
  },
  ...knexSnakeCaseMappers(),
};

export const knex = Knex(knexConfig);

Model.knex(knex);
