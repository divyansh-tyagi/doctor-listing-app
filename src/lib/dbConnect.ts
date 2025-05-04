import mongoose, { ConnectOptions } from 'mongoose';

// Type for our cached connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Get MongoDB URI (type assertion is safe because we validate immediately)
const MONGODB_URI = process.env.MONGODB_URI as string;

// Validate environment variable
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Initialize cache (using module-level variable instead of global)
const mongooseCache: MongooseCache = {
  conn: null,
  promise: null
};

// Connection options
const mongooseOptions: ConnectOptions = {
  bufferCommands: false,
};

async function dbConnect(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  // Create new connection promise if none exists
  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose.connect(MONGODB_URI, mongooseOptions)
      .then(mongoose => mongoose)
      .catch(err => {
        // Clear promise on failure to allow retry
        mongooseCache.promise = null;
        throw err;
      });
  }

  // Wait for connection and cache it
  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (err) {
    mongooseCache.conn = null;
    throw err;
  }

  return mongooseCache.conn;
}

export default dbConnect;