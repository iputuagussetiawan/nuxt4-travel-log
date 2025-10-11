import { eq, type DrizzleError } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { db } from '~/db'
import { InsertLocationSchema, location } from '~/db/schema'
import slugify from 'slug'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        )
    }
    const result = await readValidatedBody(
        event,
        InsertLocationSchema.safeParse
    )

    if (!result.success) {
        const statusMessage = result.error.issues
            .map((issue) => `${issue.path.join(' ')}: ${issue.message}`)
            .join(', ')

        const data = result.error.issues.reduce(
            (errors, issue) => {
                errors[issue.path.join(' ')] = issue.message
                return errors
            },
            {} as Record<string, string>
        )
        return sendError(
            event,
            createError({
                statusCode: 422,
                statusMessage: statusMessage,
                data
            })
        )
    }
    const slug = `${result.data.name}-${nanoid()}`
    const newSlug = slugify(slug, {
        lower: true
    })

    try {
        const [createdLocation] = await db
            .insert(location)
            .values({
                ...result.data,
                id: randomUUID(),
                slug: newSlug,
                userId: event.context.user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .returning()
        return createdLocation
    } catch (e) {
        const error = e as DrizzleError
        if (error.message) {
            return sendError(
                event,
                createError({
                    statusCode: 422,
                    statusMessage: error.message
                })
            )
        }
        console.log('INSERT ERROR', error.message)
        throw error
    }
})
