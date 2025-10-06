import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { locationLog } from './location-log-schema'
export const locationLogImage = pgTable('locationLogImage', {
    id: uuid('id').primaryKey(),
    key: text('key').notNull(),
    locationLogId: uuid('location_log_id')
        .notNull()
        .references(() => locationLog.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})
