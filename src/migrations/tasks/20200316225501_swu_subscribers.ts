import { makeDomainLogger } from "back-end/lib/logger";
import { console as consoleAdapter } from "back-end/lib/logger/adapters";
import Knex from "knex";

const logger = makeDomainLogger(consoleAdapter, "migrations", "development");

export async function up(connection: Knex): Promise<void> {
  await connection.schema.createTable("swuOpportunitySubscribers", (table) => {
    table
      .uuid("opportunity")
      .references("id")
      .inTable("swuOpportunities")
      .notNullable();
    table.uuid("user").references("id").inTable("users").notNullable();
    table.timestamp("createdAt").notNullable();
    table.primary(["opportunity", "user"]);
  });
  logger.info("Created table swuOpportunitySubscribers");
}

export async function down(connection: Knex): Promise<void> {
  await connection.schema.dropTable("swuOpportunitySubscribers");
  logger.info("Dropped table swuOpportunitySubscribers");
}
