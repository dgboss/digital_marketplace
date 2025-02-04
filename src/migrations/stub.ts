import { makeDomainLogger } from "back-end/lib/logger";
import { console as consoleAdapter } from "back-end/lib/logger/adapters";
import Knex from "knex";

makeDomainLogger(consoleAdapter, "migrations", "development");

// eslint-disable-next-line no-empty
export async function up(connection: Knex): Promise<void> {}

// eslint-disable-next-line no-empty
export async function down(connection: Knex): Promise<void> {}
