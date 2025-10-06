import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import env from '~/lib/env'

// Create the connection
const client = postgres(env.DATABASE_URL!, { prepare: false })

// Initialize drizzle
export const db = drizzle(client)
