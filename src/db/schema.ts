import { pgTable, text, timestamp, uuid, varchar, integer, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Admin users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Features table - for both upcoming features and user requests
export const features = pgTable("features", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("proposed"), // proposed, approved, in-progress, completed, declined
  voteCount: integer("vote_count").notNull().default(0),
  category: varchar("category", { length: 100 }), // feature category
  isUserSubmitted: boolean("is_user_submitted").notNull().default(false),
  submitterEmail: varchar("submitter_email", { length: 255 }),
  submitterName: varchar("submitter_name", { length: 255 }),
  createdBy: uuid("created_by").references(() => users.id), // admin who approved/created
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  statusIdx: index("features_status_idx").on(table.status),
  voteCountIdx: index("features_vote_count_idx").on(table.voteCount),
}));

// Votes table - tracks all user votes
export const votes = pgTable("votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  featureId: uuid("feature_id").notNull().references(() => features.id, { onDelete: "cascade" }),
  userEmail: varchar("user_email", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv4 or IPv6
  userAgent: text("user_agent"),
  metadata: jsonb("metadata"), // Store any additional context
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  featureIdx: index("votes_feature_idx").on(table.featureId),
  emailIdx: index("votes_email_idx").on(table.userEmail),
  ipIdx: index("votes_ip_idx").on(table.ipAddress),
  createdAtIdx: index("votes_created_at_idx").on(table.createdAt),
}));

// Release log entries
export const releases = pgTable("releases", {
  id: uuid("id").defaultRandom().primaryKey(),
  version: varchar("version", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // feature, improvement, bugfix, security
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  featuredImageUrl: text("featured_image_url"),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  publishedIdx: index("releases_published_idx").on(table.isPublished),
  publishedAtIdx: index("releases_published_at_idx").on(table.publishedAt),
}));

// Email subscriptions - newsletter opt-ins
export const emailSubscriptions = pgTable("email_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("is_active").notNull().default(true),
  source: varchar("source", { length: 100 }).notNull(), // vote, contact-form, direct
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  confirmedAt: timestamp("confirmed_at"),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("subscriptions_email_idx").on(table.email),
  activeIdx: index("subscriptions_active_idx").on(table.isActive),
}));

// Analytics events - comprehensive tracking for AI analysis
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventType: varchar("event_type", { length: 100 }).notNull(), // page_view, button_click, form_submit, scroll_depth, etc.
  eventName: varchar("event_name", { length: 255 }).notNull(), // specific event identifier
  page: varchar("page", { length: 255 }).notNull(), // URL path
  userEmail: varchar("user_email", { length: 255 }), // if identified
  sessionId: varchar("session_id", { length: 255 }).notNull(), // client-side session tracking
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent").notNull(),
  referrer: text("referrer"),
  properties: jsonb("properties").notNull(), // flexible event data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  typeIdx: index("analytics_type_idx").on(table.eventType),
  nameIdx: index("analytics_name_idx").on(table.eventName),
  pageIdx: index("analytics_page_idx").on(table.page),
  emailIdx: index("analytics_email_idx").on(table.userEmail),
  sessionIdx: index("analytics_session_idx").on(table.sessionId),
  timestampIdx: index("analytics_timestamp_idx").on(table.timestamp),
}));

// Rate limiting - track requests per IP/email
export const rateLimits = pgTable("rate_limits", {
  id: uuid("id").defaultRandom().primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(), // IP address or email
  type: varchar("type", { length: 50 }).notNull(), // vote, demo, api, etc.
  count: integer("count").notNull().default(1),
  windowStart: timestamp("window_start").notNull(),
  windowEnd: timestamp("window_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  identifierTypeIdx: index("rate_limits_identifier_type_idx").on(table.identifier, table.type),
  windowEndIdx: index("rate_limits_window_end_idx").on(table.windowEnd),
}));

// Demo requests - from /demo page form submissions
export const demoRequests = pgTable("demo_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }),
  role: varchar("role", { length: 100 }), // professor, admin, student, other
  message: text("message"),
  phoneNumber: varchar("phone_number", { length: 50 }),
  preferredDate: timestamp("preferred_date"),
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, contacted, scheduled, completed, declined
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  source: varchar("source", { length: 100 }), // utm parameters, referrer, etc
  notes: text("notes"), // admin notes
  assignedTo: uuid("assigned_to").references(() => users.id), // which admin is handling this
  contactedAt: timestamp("contacted_at"),
  scheduledFor: timestamp("scheduled_for"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("demo_requests_email_idx").on(table.email),
  statusIdx: index("demo_requests_status_idx").on(table.status),
  createdAtIdx: index("demo_requests_created_at_idx").on(table.createdAt),
}));

// Contact form submissions - from /contact page
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  type: varchar("type", { length: 100 }).notNull().default("general"), // general, support, partnership, media
  phoneNumber: varchar("phone_number", { length: 50 }),
  status: varchar("status", { length: 50 }).notNull().default("new"), // new, in-progress, responded, closed
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  source: varchar("source", { length: 100 }),
  notes: text("notes"), // admin notes
  assignedTo: uuid("assigned_to").references(() => users.id),
  respondedAt: timestamp("responded_at"),
  closedAt: timestamp("closed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("contact_submissions_email_idx").on(table.email),
  statusIdx: index("contact_submissions_status_idx").on(table.status),
  typeIdx: index("contact_submissions_type_idx").on(table.type),
  createdAtIdx: index("contact_submissions_created_at_idx").on(table.createdAt),
}));

// Integration requests - from /integrations page
export const integrationRequests = pgTable("integration_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  // Integration details
  integrationName: varchar("integration_name", { length: 255 }).notNull(),
  platform: varchar("platform", { length: 255 }), // e.g., Canvas, Blackboard, etc.

  // Institution/Organization
  institutionName: varchar("institution_name", { length: 255 }).notNull(),

  // Contact person
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactRole: varchar("contact_role", { length: 100 }), // IT Director, Dean, etc.
  phoneNumber: varchar("phone_number", { length: 50 }),

  // Request details
  numberOfUsers: integer("number_of_users"), // estimated user count
  timeline: varchar("timeline", { length: 100 }), // immediate, 1-3 months, 6+ months, etc.
  urgency: varchar("urgency", { length: 50 }), // low, medium, high, critical
  useCaseDescription: text("use_case_description").notNull(),
  existingTechStack: text("existing_tech_stack"), // other tools/systems in use

  // Admin tracking
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, contacted, in-progress, completed, declined
  notes: text("notes"), // admin notes
  assignedTo: uuid("assigned_to").references(() => users.id),

  // Tracking metadata
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  source: varchar("source", { length: 100 }), // utm parameters, referrer, etc

  // Status timestamps
  contactedAt: timestamp("contacted_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("integration_requests_email_idx").on(table.contactEmail),
  statusIdx: index("integration_requests_status_idx").on(table.status),
  integrationIdx: index("integration_requests_integration_idx").on(table.integrationName),
  createdAtIdx: index("integration_requests_created_at_idx").on(table.createdAt),
}));

// Relations
export const featuresRelations = relations(features, ({ one, many }) => ({
  creator: one(users, {
    fields: [features.createdBy],
    references: [users.id],
  }),
  votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  feature: one(features, {
    fields: [votes.featureId],
    references: [features.id],
  }),
}));

export const releasesRelations = relations(releases, ({ one }) => ({
  creator: one(users, {
    fields: [releases.createdBy],
    references: [users.id],
  }),
}));

export const demoRequestsRelations = relations(demoRequests, ({ one }) => ({
  assignedAdmin: one(users, {
    fields: [demoRequests.assignedTo],
    references: [users.id],
  }),
}));

export const contactSubmissionsRelations = relations(contactSubmissions, ({ one }) => ({
  assignedAdmin: one(users, {
    fields: [contactSubmissions.assignedTo],
    references: [users.id],
  }),
}));

export const integrationRequestsRelations = relations(integrationRequests, ({ one }) => ({
  assignedAdmin: one(users, {
    fields: [integrationRequests.assignedTo],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;

export type Release = typeof releases.$inferSelect;
export type NewRelease = typeof releases.$inferInsert;

export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type NewEmailSubscription = typeof emailSubscriptions.$inferInsert;

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;

export type RateLimit = typeof rateLimits.$inferSelect;
export type NewRateLimit = typeof rateLimits.$inferInsert;

export type DemoRequest = typeof demoRequests.$inferSelect;
export type NewDemoRequest = typeof demoRequests.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

export type IntegrationRequest = typeof integrationRequests.$inferSelect;
export type NewIntegrationRequest = typeof integrationRequests.$inferInsert;
