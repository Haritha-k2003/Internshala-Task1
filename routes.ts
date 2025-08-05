import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInternSchema, loginSchema, insertReferralSchema, insertDonationSchema, insertActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const intern = await storage.validateIntern(email, password);
      
      if (!intern) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ intern: { ...intern, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const internData = insertInternSchema.parse(req.body);
      
      // Check if email already exists
      const existingIntern = await storage.getInternByEmail(internData.email);
      if (existingIntern) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const intern = await storage.createIntern(internData);
      res.status(201).json({ intern: { ...intern, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Intern profile and stats
  app.get("/api/intern/:id", async (req, res) => {
    try {
      const intern = await storage.getIntern(req.params.id);
      if (!intern) {
        return res.status(404).json({ message: "Intern not found" });
      }
      res.json({ ...intern, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/intern/:id/stats", async (req, res) => {
    try {
      const intern = await storage.getIntern(req.params.id);
      if (!intern) {
        return res.status(404).json({ message: "Intern not found" });
      }

      const referrals = await storage.getReferralsByIntern(req.params.id);
      const donations = await storage.getDonationsByIntern(req.params.id);
      const rewards = await storage.getInternRewards(req.params.id);
      
      res.json({
        totalRaised: intern.totalRaised || 0,
        referralCount: referrals.length,
        donationCount: donations.length,
        rewardsCount: rewards.length,
        rank: intern.rank || 0,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Referral routes
  app.get("/api/intern/:id/referrals", async (req, res) => {
    try {
      const referrals = await storage.getReferralsByIntern(req.params.id);
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/intern/:id/referrals", async (req, res) => {
    try {
      const referralData = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(req.params.id, referralData);
      
      // Update intern's referral count
      const intern = await storage.getIntern(req.params.id);
      if (intern) {
        await storage.updateIntern(req.params.id, { 
          referralCount: (intern.referralCount || 0) + 1 
        });
      }
      
      // Create activity
      await storage.createActivity(req.params.id, {
        type: "referral",
        description: `New referral signup: ${referralData.referredName}`,
      });
      
      res.status(201).json(referral);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Donation routes
  app.get("/api/intern/:id/donations", async (req, res) => {
    try {
      const donations = await storage.getDonationsByIntern(req.params.id);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/intern/:id/donations", async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(req.params.id, donationData);
      
      // Create activity
      await storage.createActivity(req.params.id, {
        type: "donation",
        description: `New donation received`,
        amount: donationData.amount,
      });
      
      res.status(201).json(donation);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Rewards routes
  app.get("/api/rewards", async (req, res) => {
    try {
      const rewards = await storage.getAllRewards();
      res.json(rewards);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/intern/:id/rewards", async (req, res) => {
    try {
      const internRewards = await storage.getInternRewards(req.params.id);
      const allRewards = await storage.getAllRewards();
      const intern = await storage.getIntern(req.params.id);
      
      if (!intern) {
        return res.status(404).json({ message: "Intern not found" });
      }

      const rewardsWithStatus = allRewards.map(reward => {
        const isUnlocked = internRewards.some(ir => ir.rewardId === reward.id);
        const isEligible = reward.requirementType === "amount" 
          ? (intern.totalRaised || 0) >= reward.requirement
          : (intern.referralCount || 0) >= reward.requirement;
        
        return {
          ...reward,
          unlocked: isUnlocked,
          eligible: isEligible,
          progress: reward.requirementType === "amount" 
            ? Math.min((intern.totalRaised || 0) / reward.requirement, 1)
            : Math.min((intern.referralCount || 0) / reward.requirement, 1)
        };
      });
      
      res.json(rewardsWithStatus);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Activity routes
  app.get("/api/intern/:id/activities", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getRecentActivities(req.params.id, limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Leaderboard route
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const interns = await storage.getAllInterns();
      const leaderboard = interns.map((intern, index) => ({
        id: intern.id,
        name: `${intern.firstName} ${intern.lastName}`,
        referralCode: intern.referralCode,
        totalRaised: intern.totalRaised || 0,
        referralCount: intern.referralCount || 0,
        rank: index + 1,
      }));
      
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
