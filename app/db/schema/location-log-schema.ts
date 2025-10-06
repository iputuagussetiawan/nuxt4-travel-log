import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { location } from './location-schema'
export const locationLog = pgTable('locationLog', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    startedAt: timestamp('started_at').notNull(),
    endedAt: timestamp('ended_at').notNull(),
    lat: text('lat').notNull(),
    long: text('long').notNull(),
    locationId: uuid('location_id')
        .notNull()
        .references(() => location.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})
