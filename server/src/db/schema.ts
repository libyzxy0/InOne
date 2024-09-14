import {
  uuid,
  text,
  pgTable,
  timestamp,
  jsonb, 
  boolean
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm'

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  message: text("message"),
  attachmentUrl: text("attachment_url"), 
  reactions: jsonb('reactions').default(null),
  user_id: uuid('user_id').notNull().references(() => users.id),
  thread_id: uuid('thread_id').notNull().references(() => threads.id),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  created_by: uuid('created_by').notNull().references(() => users.id),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  username: text("username").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: text("status", { enum: ["online", "offline"] }).notNull().default("offline"),
  email_verified: boolean('email_verified').default(false),
  avatar_url: text('avatar_url'), 
  authProvider: text("auth_provider", { enum: ["email", "google"] }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.user_id],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [messages.thread_id],
    references: [threads.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  threads_created: many(threads)
}));

export const threadsRelations = relations(threads, ({ many, one }) => ({
  messages: many(messages),
  created_by: one(users, {
    fields: [threads.created_by],
    references: [users.id],
  }),
}));