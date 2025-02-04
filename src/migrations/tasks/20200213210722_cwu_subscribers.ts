import { makeDomainLogger } from "back-end/lib/logger";
import { console as consoleAdapter } from "back-end/lib/logger/adapters";
import Knex from "knex";

const logger = makeDomainLogger(consoleAdapter, "migrations", "development");

export async function up(connection: Knex): Promise<void> {
  await connection.schema.createTable("cwuOpportunitySubscribers", (table) => {
    table
      .uuid("opportunity")
      .references("id")
      .inTable("cwuOpportunities")
      .notNullable();
    table.uuid("user").references("id").inTable("users").notNullable();
    table.timestamp("createdAt").notNullable();
    table.primary(["opportunity", "user"]);
  });
  logger.info("Created table cwuOpportunitySubscribers");
}

export async function down(connection: Knex): Promise<void> {
  await connection.schema.dropTable("cwuOpportunitySubscribers");
  logger.info("Dropped table cwuOpportunitySubscribers");
}
