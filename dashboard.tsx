import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/App";
import Sidebar from "@/components/sidebar";
import StatsCard from "@/components/stats-card";
import ReferralCodeCard from "@/components/referral-code-card";
import RewardsSection from "@/components/rewards-section";
import RecentActivity from "@/components/recent-activity";
import { useIsMobile } from "@/hooks/use-mobile";
import { DollarSign, Share, Trophy, Gift } from "lucide-react";

export default function Dashboard() {
  const { currentIntern } = useAuth();
  const isMobile = useIsMobile();

  const { data: stats } = useQuery({
    queryKey: ["/api/intern", currentIntern?.id, "stats"],
    enabled: !!currentIntern?.id,
  });

  const { data: activities } = useQuery({
    queryKey: ["/api/intern", currentIntern?.id, "activities"],
    enabled: !!currentIntern?.id,
  });

  if (!currentIntern) return null;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        {isMobile && (
          <header className="bg-white border-b border-slate-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                    <span className="text-slate-600 text-sm font-medium">
                      {currentIntern.firstName[0]}{currentIntern.lastName[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900" data-testid="text-welcome">
                Welcome back, {currentIntern.firstName}!
              </h1>
              <p className="mt-2 text-slate-600">
                Track your referrals, donations, and rewards in your personalized dashboard.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Raised"
                value={`$${stats?.totalRaised?.toLocaleString() || '0'}`}
                change="+12.3%"
                changeLabel="from last month"
                icon={DollarSign}
                iconBg="bg-primary/10"
                iconColor="text-primary"
                testId="card-total-raised"
              />
              
              <StatsCard
                title="Referrals"
                value={stats?.referralCount?.toString() || '0'}
                change="+8 new"
                changeLabel="this week"
                icon={Share}
                iconBg="bg-secondary/10"
                iconColor="text-secondary"
                testId="card-referrals"
              />
              
              <StatsCard
                title="Rank"
                value={`#${currentIntern.rank || 'N/A'}`}
                change="Top 10%"
                changeLabel="of interns"
                icon={Trophy}
                iconBg="bg-accent/10"
                iconColor="text-accent"
                testId="card-rank"
              />
              
              <StatsCard
                title="Rewards"
                value={stats?.rewardsCount?.toString() || '0'}
                change="2 unlocked"
                changeLabel="recently"
                icon={Gift}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
                testId="card-rewards"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ReferralCodeCard />
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-left"
                    data-testid="button-generate-code"
                  >
                    <Share className="inline w-4 h-4 mr-3" />
                    Generate New Code
                  </button>
                  <button 
                    className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors text-left"
                    data-testid="button-view-analytics"
                  >
                    <Trophy className="inline w-4 h-4 mr-3" />
                    View Analytics
                  </button>
                  <button 
                    className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors text-left"
                    data-testid="button-download-report"
                  >
                    <DollarSign className="inline w-4 h-4 mr-3" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RewardsSection />
              <RecentActivity activities={activities || []} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
