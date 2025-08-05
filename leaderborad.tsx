import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeaderboardEntry {
  id: string;
  name: string;
  referralCode: string;
  totalRaised: number;
  referralCount: number;
  rank: number;
}

export default function Leaderboard() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("This Month");

  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20";
      case 2:
        return "bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20";
      case 3:
        return "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20";
      default:
        return "bg-slate-50";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-accent text-white";
      case 2:
        return "bg-secondary text-white";
      case 3:
        return "bg-primary text-white";
      default:
        return "bg-slate-400 text-white";
    }
  };

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
                  <h1 className="text-xl font-semibold text-slate-800">Leaderboard</h1>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900" data-testid="text-leaderboard-title">
                  Leaderboard
                </h2>
                <div className="flex items-center space-x-2">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]" data-testid="select-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="This Month">This Month</SelectItem>
                      <SelectItem value="All Time">All Time</SelectItem>
                      <SelectItem value="This Week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center p-4 bg-slate-100 rounded-lg">
                        <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                        <div className="ml-4 flex-1">
                          <div className="h-4 bg-slate-300 rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-slate-300 rounded w-1/3"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-slate-300 rounded w-16 mb-2"></div>
                          <div className="h-3 bg-slate-300 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard?.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center p-4 rounded-lg ${getRankColor(entry.rank)}`}
                      data-testid={`row-leaderboard-${entry.rank}`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${getRankBadgeColor(entry.rank)}`}>
                        {entry.rank}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-slate-900" data-testid={`text-name-${entry.rank}`}>
                          {entry.name}
                        </h4>
                        <p className="text-sm text-slate-600" data-testid={`text-details-${entry.rank}`}>
                          {entry.referralCode} • {entry.referralCount} referrals
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900" data-testid={`text-amount-${entry.rank}`}>
                          ${entry.totalRaised.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600">raised</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
