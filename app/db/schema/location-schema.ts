import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
export const location = pgTable('location', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    slug: text('slug').notNull().unique(),
    lat: text('lat').notNull(),
    long: text('long').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})
