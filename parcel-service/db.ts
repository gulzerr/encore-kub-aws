import { SQLDatabase } from "encore.dev/storage/sqldb";

// Database setup
export const db = new SQLDatabase("parcels", {
  migrations: "./migrations",
});
