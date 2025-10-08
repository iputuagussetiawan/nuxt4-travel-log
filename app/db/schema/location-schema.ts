import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'
export const location = pgTable('location', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    slug: text('slug').notNull().unique(),
    lat: text('lat').notNull(),
    long: text('long').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})
