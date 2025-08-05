import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext } from "react";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Leaderboard from "@/pages/leaderboard";
import NotFound from "@/pages/not-found";
import type { Intern } from "@shared/schema";

interface AuthContextType {
  currentIntern: Intern | null;
  setCurrentIntern: (intern: Intern | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentIntern: null,
  setCurrentIntern: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const [currentIntern, setCurrentIntern] = useState<Intern | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ currentIntern, setCurrentIntern }}>
        <TooltipProvider>
          <Toaster />
          <Switch>
            {!currentIntern ? (
              <>
                <Route path="/signup" component={Signup} />
                <Route path="/" component={Login} />
                <Route component={Login} />
              </>
            ) : (
              <>
                <Route path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route component={NotFound} />
              </>
            )}
          </Switch>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
