import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db' // your drizzle instance
import * as schema from '../db/schema'
import env from './env'
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        schema,
        provider: 'pg' // or "mysql", "sqlite"
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID!,
            clientSecret: env.GITHUB_CLIENT_SECRET!
        }
    }
})
