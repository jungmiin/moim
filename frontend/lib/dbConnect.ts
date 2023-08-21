import { Db, MongoClient } from "mongodb";

let cachedClient: MongoClient,
  cachedDatabase: Db | null = null;

export const dbConnect = function async() {
  const { MONGODB_URI, MONGODB_NAME } = process.env;
  if (cachedClient !== null && cachedDatabase !== null) {
    return { client: cachedClient, database: cachedDatabase };
  } else {
    try {
      const client = new MongoClient(`${MONGODB_URI}`);
      const database = client.db(MONGODB_NAME);
      cachedClient = client;
      cachedDatabase = database;
      return { client, database };
    } catch (err) {
      throw new Error(err as any);
    }
  }
};
