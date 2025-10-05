import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Create the connection
const client = postgres(process.env.DATABASE_URL!, { prepare: false })

// Initialize drizzle
export const db = drizzle(client)
