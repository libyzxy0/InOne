"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.messagesRelations = exports.users = exports.messages = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.messages = (0, pg_core_1.pgTable)("messages", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().unique().notNull(),
    message: (0, pg_core_1.text)("message"),
    attachmentUrl: (0, pg_core_1.text)("attachment_url"),
    reactions: (0, pg_core_1.jsonb)('reactions'),
    user_id: (0, pg_core_1.uuid)('user_id').notNull().references(function () { return exports.users.id; }),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).defaultNow(),
});
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().unique().notNull(),
    username: (0, pg_core_1.text)("username").notNull(),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    status: (0, pg_core_1.text)("status", { enum: ["online", "offline"] }).default("offline"),
    email_verified: (0, pg_core_1.boolean)('email_verified').default(false),
    authProvider: (0, pg_core_1.text)("status", { enum: ["email", "google"] }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).defaultNow(),
});
exports.messagesRelations = (0, drizzle_orm_1.relations)(exports.messages, function (_a) {
    var one = _a.one;
    return ({
        user_id: one(exports.users, {
            fields: [exports.messages.user_id],
            references: [exports.users.id],
        }),
    });
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        messages: many(exports.messages),
    });
});
