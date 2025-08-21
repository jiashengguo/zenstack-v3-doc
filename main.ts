import { ZenStackClient } from "@zenstackhq/runtime";
import SQLite from "better-sqlite3";
import { SqliteDialect } from "kysely";
import { schema } from "./zenstack/schema";

async function main() {
  const client = new ZenStackClient(schema, {
    dialect: new SqliteDialect({
      database: new SQLite("./zenstack/dev.db"),
    }),
  });
  const user = await client.user.create({
    data: {
      email: "test@zenstack.dev",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is a test post",
          },
        ],
      },
    },
    include: { posts: true },
  });
  console.log("User created:", user);
}

main();
