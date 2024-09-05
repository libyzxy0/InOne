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
  reactions: jsonb('reactions'),
  user_id: uuid('user_id').notNull().references(() => users.id),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  username: text("username").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: text("status", { enum: ["online", "offline"] }).default("offline"),
  email_verified: boolean('email_verified').default(false),
  authProvider: text("status", { enum: ["email", "google"] }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  user_id: one(users, {
    fields: [messages.user_id],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
}));