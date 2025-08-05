import { 
  type Intern, 
  type InsertIntern, 
  type Referral, 
  type InsertReferral,
  type Donation,
  type InsertDonation,
  type Reward,
  type InternReward,
  type Activity,
  type InsertActivity,
  type LoginData
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Intern operations
  getIntern(id: string): Promise<Intern | undefined>;
  getInternByEmail(email: string): Promise<Intern | undefined>;
  createIntern(intern: InsertIntern): Promise<Intern>;
  updateIntern(id: string, updates: Partial<Intern>): Promise<Intern | undefined>;
  getAllInterns(): Promise<Intern[]>;
  
  // Referral operations
  getReferralsByIntern(internId: string): Promise<Referral[]>;
  createReferral(internId: string, referral: InsertReferral): Promise<Referral>;
  
  // Donation operations
  getDonationsByIntern(internId: string): Promise<Donation[]>;
  createDonation(internId: string, donation: InsertDonation): Promise<Donation>;
  
  // Reward operations
  getAllRewards(): Promise<Reward[]>;
  getInternRewards(internId: string): Promise<InternReward[]>;
  unlockReward(internId: string, rewardId: string): Promise<InternReward>;
  
  // Activity operations
  getRecentActivities(internId: string, limit?: number): Promise<Activity[]>;
  createActivity(internId: string, activity: InsertActivity): Promise<Activity>;
  
  // Authentication
  validateIntern(email: string, password: string): Promise<Intern | null>;
}

export class MemStorage implements IStorage {
  private interns: Map<string, Intern>;
  private referrals: Map<string, Referral>;
  private donations: Map<string, Donation>;
  private rewards: Map<string, Reward>;
  private internRewards: Map<string, InternReward>;
  private activities: Map<string, Activity>;

  constructor() {
    this.interns = new Map();
    this.referrals = new Map();
    this.donations = new Map();
    this.rewards = new Map();
    this.internRewards = new Map();
    this.activities = new Map();
    
    this.initializeRewards();
    this.initializeSampleData();
  }

  private initializeRewards() {
    const defaultRewards: Reward[] = [
      {
        id: "reward-1",
        name: "Top Performer Badge",
        description: "Unlocked for raising $2,500+",
        icon: "fas fa-trophy",
        requirement: 2500,
        requirementType: "amount",
        unlocked: false,
      },
      {
        id: "reward-2",
        name: "Referral Master",
        description: "Get 50 successful referrals",
        icon: "fas fa-star",
        requirement: 50,
        requirementType: "referrals",
        unlocked: false,
      },
      {
        id: "reward-3",
        name: "Elite Status",
        description: "Raise $5,000 total",
        icon: "fas fa-crown",
        requirement: 5000,
        requirementType: "amount",
        unlocked: false,
      },
    ];

    defaultRewards.forEach(reward => {
      this.rewards.set(reward.id, reward);
    });
  }

  private initializeSampleData() {
    // Create sample interns for leaderboard
    const sampleInterns: InsertIntern[] = [
      { firstName: "Sarah", lastName: "Chen", email: "sarah@example.com", password: "password" },
      { firstName: "Mike", lastName: "Rodriguez", email: "mike@example.com", password: "password" },
      { firstName: "Emma", lastName: "Taylor", email: "emma@example.com", password: "password" },
      { firstName: "David", lastName: "Kim", email: "david@example.com", password: "password" },
    ];

    sampleInterns.forEach(async (intern, index) => {
      const created = await this.createIntern(intern);
      // Set sample stats
      const stats = [
        { totalRaised: 4250, referralCount: 73, rank: 1 },
        { totalRaised: 3180, referralCount: 61, rank: 2 },
        { totalRaised: 2150, referralCount: 39, rank: 4 },
        { totalRaised: 1890, referralCount: 32, rank: 5 },
      ];
      
      this.interns.set(created.id, { 
        ...created, 
        ...stats[index],
        referralCode: `${intern.firstName.toUpperCase()}2025`
      });
    });
  }

  async getIntern(id: string): Promise<Intern | undefined> {
    return this.interns.get(id);
  }

  async getInternByEmail(email: string): Promise<Intern | undefined> {
    return Array.from(this.interns.values()).find(intern => intern.email === email);
  }

  async createIntern(insertIntern: InsertIntern): Promise<Intern> {
    const id = randomUUID();
    const referralCode = `${insertIntern.firstName.toUpperCase()}2025`;
    const intern: Intern = {
      ...insertIntern,
      id,
      referralCode,
      totalRaised: 0,
      referralCount: 0,
      rank: 0,
      createdAt: new Date(),
    };
    this.interns.set(id, intern);
    return intern;
  }

  async updateIntern(id: string, updates: Partial<Intern>): Promise<Intern | undefined> {
    const intern = this.interns.get(id);
    if (!intern) return undefined;
    
    const updated = { ...intern, ...updates };
    this.interns.set(id, updated);
    return updated;
  }

  async getAllInterns(): Promise<Intern[]> {
    return Array.from(this.interns.values()).sort((a, b) => (b.totalRaised || 0) - (a.totalRaised || 0));
  }

  async getReferralsByIntern(internId: string): Promise<Referral[]> {
    return Array.from(this.referrals.values()).filter(referral => referral.internId === internId);
  }

  async createReferral(internId: string, insertReferral: InsertReferral): Promise<Referral> {
    const id = randomUUID();
    const referral: Referral = {
      ...insertReferral,
      id,
      internId,
      status: "pending",
      createdAt: new Date(),
    };
    this.referrals.set(id, referral);
    return referral;
  }

  async getDonationsByIntern(internId: string): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(donation => donation.internId === internId);
  }

  async createDonation(internId: string, insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      ...insertDonation,
      id,
      internId,
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    
    // Update intern's total raised
    const intern = await this.getIntern(internId);
    if (intern) {
      await this.updateIntern(internId, { 
        totalRaised: (intern.totalRaised || 0) + insertDonation.amount 
      });
    }
    
    return donation;
  }

  async getAllRewards(): Promise<Reward[]> {
    return Array.from(this.rewards.values());
  }

  async getInternRewards(internId: string): Promise<InternReward[]> {
    return Array.from(this.internRewards.values()).filter(ir => ir.internId === internId);
  }

  async unlockReward(internId: string, rewardId: string): Promise<InternReward> {
    const id = randomUUID();
    const internReward: InternReward = {
      id,
      internId,
      rewardId,
      unlockedAt: new Date(),
    };
    this.internRewards.set(id, internReward);
    return internReward;
  }

  async getRecentActivities(internId: string, limit: number = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.internId === internId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createActivity(internId: string, insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = {
      ...insertActivity,
      id,
      internId,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async validateIntern(email: string, password: string): Promise<Intern | null> {
    const intern = await this.getInternByEmail(email);
    if (intern && intern.password === password) {
      return intern;
    }
    return null;
  }
}

export const storage = new MemStorage();
