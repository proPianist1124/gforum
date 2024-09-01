import postgres from "postgres";
import { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } from "$env/static/private";

export const db = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: "require",
    connection: {
      options: `project=${ENDPOINT_ID}`,
    }
});