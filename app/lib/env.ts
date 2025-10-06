import { z } from 'zod'
import tryParseEnv from './try-parse-env'

const envSchema = z.object({
    NODE_ENV: z.string()
})

tryParseEnv(envSchema)

export type envSchema = z.infer<typeof envSchema>
export default envSchema.parse(process.env)
