CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"event_name" varchar(255) NOT NULL,
	"page" varchar(255) NOT NULL,
	"user_email" varchar(255),
	"session_id" varchar(255) NOT NULL,
	"ip_address" varchar(45) NOT NULL,
	"user_agent" text NOT NULL,
	"referrer" text,
	"properties" jsonb NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255),
	"message" text NOT NULL,
	"type" varchar(100) DEFAULT 'general' NOT NULL,
	"phone_number" varchar(50),
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"ip_address" varchar(45) NOT NULL,
	"user_agent" text,
	"source" varchar(100),
	"notes" text,
	"assigned_to" uuid,
	"responded_at" timestamp,
	"closed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demo_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"institution" varchar(255),
	"role" varchar(100),
	"message" text,
	"phone_number" varchar(50),
	"preferred_date" timestamp,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"ip_address" varchar(45) NOT NULL,
	"user_agent" text,
	"source" varchar(100),
	"notes" text,
	"assigned_to" uuid,
	"contacted_at" timestamp,
	"scheduled_for" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"source" varchar(100) NOT NULL,
	"ip_address" varchar(45) NOT NULL,
	"user_agent" text,
	"confirmed_at" timestamp,
	"unsubscribed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_subscriptions_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(50) DEFAULT 'proposed' NOT NULL,
	"vote_count" integer DEFAULT 0 NOT NULL,
	"category" varchar(100),
	"is_user_submitted" boolean DEFAULT false NOT NULL,
	"submitter_email" varchar(255),
	"submitter_name" varchar(255),
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"window_start" timestamp NOT NULL,
	"window_end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "releases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"featured_image_url" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"feature_id" uuid NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_name" varchar(255),
	"ip_address" varchar(45) NOT NULL,
	"user_agent" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demo_requests" ADD CONSTRAINT "demo_requests_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases" ADD CONSTRAINT "releases_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analytics_type_idx" ON "analytics_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "analytics_name_idx" ON "analytics_events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "analytics_page_idx" ON "analytics_events" USING btree ("page");--> statement-breakpoint
CREATE INDEX "analytics_email_idx" ON "analytics_events" USING btree ("user_email");--> statement-breakpoint
CREATE INDEX "analytics_session_idx" ON "analytics_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "analytics_timestamp_idx" ON "analytics_events" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contact_submissions_type_idx" ON "contact_submissions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "demo_requests_email_idx" ON "demo_requests" USING btree ("email");--> statement-breakpoint
CREATE INDEX "demo_requests_status_idx" ON "demo_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "demo_requests_created_at_idx" ON "demo_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "subscriptions_email_idx" ON "email_subscriptions" USING btree ("email");--> statement-breakpoint
CREATE INDEX "subscriptions_active_idx" ON "email_subscriptions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "features_status_idx" ON "features" USING btree ("status");--> statement-breakpoint
CREATE INDEX "features_vote_count_idx" ON "features" USING btree ("vote_count");--> statement-breakpoint
CREATE INDEX "rate_limits_identifier_type_idx" ON "rate_limits" USING btree ("identifier","type");--> statement-breakpoint
CREATE INDEX "rate_limits_window_end_idx" ON "rate_limits" USING btree ("window_end");--> statement-breakpoint
CREATE INDEX "releases_published_idx" ON "releases" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "releases_published_at_idx" ON "releases" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "votes_feature_idx" ON "votes" USING btree ("feature_id");--> statement-breakpoint
CREATE INDEX "votes_email_idx" ON "votes" USING btree ("user_email");--> statement-breakpoint
CREATE INDEX "votes_ip_idx" ON "votes" USING btree ("ip_address");--> statement-breakpoint
CREATE INDEX "votes_created_at_idx" ON "votes" USING btree ("created_at");