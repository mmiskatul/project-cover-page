import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var __coverPageMongooseCache:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const cache = globalThis.__coverPageMongooseCache ?? { conn: null, promise: null };
globalThis.__coverPageMongooseCache = cache;

export function isMongoConfigured() {
  return Boolean(MONGODB_URI);
}

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
