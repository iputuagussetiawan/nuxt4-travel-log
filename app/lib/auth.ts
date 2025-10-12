import { betterAuth, type User } from 'better-auth'
import { createAuthMiddleware } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db' // your drizzle instance
import * as schema from '@/db/schema'
import env from './env'

export type UserWithId = Omit<User, 'id'> & {
    id: string
}

export const auth = betterAuth({
    // hooks: {
    //     after: createAuthMiddleware(async (ctx) => {
    //         if (ctx.path === 'get-session') {
    //             if (!ctx.context.session) {
    //                 return ctx.json({
    //                     session: null,
    //                     user: null
    //                 })
    //             }
    //             return ctx.json(ctx.context.session)
    //         }
    //     })
    // },
    database: drizzleAdapter(db, {
        schema,
        provider: 'pg' // or "mysql", "sqlite"
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID!,
            clientSecret: env.GITHUB_CLIENT_SECRET!,
            disableImplicitSignUp: false
        }
    }
})
