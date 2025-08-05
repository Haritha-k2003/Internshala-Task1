import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const interns = pgTable("interns", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  referralCode: text("referral_code").notNull().unique(),
  totalRaised: integer("total_raised").default(0),
  referralCount: integer("referral_count").default(0),
  rank: integer("rank").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const referrals = pgTable("referrals", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: varchar("intern_id")
    .notNull()
    .references(() => interns.id),
  referredEmail: text("referred_email").notNull(),
  referredName: text("referred_name").notNull(),
  status: text("status").notNull().default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: varchar("intern_id")
    .notNull()
    .references(() => interns.id),
  amount: integer("amount").notNull(),
  source: text("source").notNull(), // referral ID or direct
  createdAt: timestamp("created_at").defaultNow(),
});

export const rewards = pgTable("rewards", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: integer("requirement").notNull(),
  requirementType: text("requirement_type").notNull(), // amount, referrals
  unlocked: boolean("unlocked").default(false),
});

export const internRewards = pgTable("intern_rewards", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: varchar("intern_id")
    .notNull()
    .references(() => interns.id),
  rewardId: varchar("reward_id")
    .notNull()
    .references(() => rewards.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: varchar("intern_id")
    .notNull()
    .references(() => interns.id),
  type: text("type").notNull(), // donation, referral, reward, share
  description: text("description").notNull(),
  amount: integer("amount"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Auth schemas
export const insertInternSchema = createInsertSchema(interns).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Other insert schemas
export const insertReferralSchema = createInsertSchema(referrals).pick({
  referredEmail: true,
  referredName: true,
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  amount: true,
  source: true,
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  description: true,
  amount: true,
});

// Types
export type Intern = typeof interns.$inferSelect;
export type InsertIntern = z.infer<typeof insertInternSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Reward = typeof rewards.$inferSelect;
export type InternReward = typeof internRewards.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
