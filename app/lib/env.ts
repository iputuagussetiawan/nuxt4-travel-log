import { z } from 'zod'
import tryParseEnv from './try-parse-env'

const envSchema = z.object({
    NODE_ENV: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    DATABASE_URL: z.string(),
    BETTER_AUTH_URL: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_CALLBACK_URL: z.string()
})

tryParseEnv(envSchema)

export type envSchema = z.infer<typeof envSchema>
export default envSchema.parse(process.env)
