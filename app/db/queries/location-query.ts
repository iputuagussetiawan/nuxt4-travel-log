import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { db } from '~/db'
import { InsertLocationSchema, location } from '~/db/schema'
import { randomUUID } from 'node:crypto'

export async function findLocations(userId: string) {
    return await db.select().from(location).where(eq(location.userId, userId))
}

export async function findLocationByName(
    existingLocation: InsertLocationSchema,
    userId: string
) {
    return await db
        .select()
        .from(location)
        .where(
            and(
                eq(location.name, existingLocation.name),
                eq(location.userId, userId)
            )
        )
        .limit(1)
}

export async function findLocationBySlug(slug: string) {
    return await db
        .select()
        .from(location)
        .where(eq(location.slug, slug))
        .limit(1)
}

export async function findUniqueSlug(slug: string) {
    let existing = !!(await findLocationBySlug(slug))

    while (existing) {
        const id = nanoid()
        const idSlug = `${slug}-${id}`
        existing = !!(await findLocationBySlug(idSlug))
        if (!existing) {
            slug = idSlug
        }
    }

    return slug
}

export async function insertLocation(
    dataFieldLocation: InsertLocationSchema,
    slug: string,
    userId: string
) {
    const [createdLocation] = await db
        .insert(location)
        .values({
            ...dataFieldLocation,
            id: randomUUID(),
            slug: slug,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .returning()
    return createdLocation
}
