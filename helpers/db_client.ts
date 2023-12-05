import { MongoClient, Database } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  await client.connect(Deno.env.get('MONGO_URI'));
  console.log("Database connected!")
  db = client.database(Deno.env.get('todolist'));
}

export function getDb() {
  return db;
} 

