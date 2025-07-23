import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskScoreCard } from "./RiskScoreCard";
import { AuthFlowSimulator } from "./AuthFlowSimulator";
import { RAGChallenge } from "./RAGChallenge";
import { SignalMonitor } from "./SignalMonitor";
import { 
  Shield, 
  Activity, 
  Users, 
  TrendingUp,
  RefreshCw,
  Eye,
  Brain
} from "lucide-react";

export const BankShieldDashboard = () => {
  const [currentRisk, setCurrentRisk] = useState({
    score: 23,
    level: 1,
    factors: ["New WiFi network", "Different time of login"]
  });
  
  const [showRAG, setShowRAG] = useState(false);
  const [authResult, setAuthResult] = useState<boolean | null>(null);
  const [sessionsToday] = useState(1247);
  const [threatsBlocked] = useState(23);
  const [falsePositives] = useState(2);

  const simulateNewSession = () => {
    const risks = [
      { score: 15, level: 0, factors: [] },
      { score: 35, level: 1, factors: ["Different IP address"] },
      { score: 65, level: 2, factors: ["New device", "VPN detected"] },
      { score: 85, level: 3, factors: ["SIM swap detected", "Emulator", "Suspicious IP"] },
      { score: 95, level: 4, factors: ["Multiple fraud indicators", "Blacklisted device", "Known attack pattern"] }
    ];
    
    const newRisk = risks[Math.floor(Math.random() * risks.length)];
    setCurrentRisk(newRisk);
    setAuthResult(null);
    setShowRAG(false);
  };

  const handleAuthComplete = (success: boolean) => {
    setAuthResult(success);
    if (!success && currentRisk.level === 2) {
      setShowRAG(true);
    }
  };

  const handleRAGComplete = (success: boolean) => {
    setAuthResult(success);
    setShowRAG(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BankShield AI
            </h1>
            <p className="text-muted-foreground">
              AI-Powered Risk-Based Authentication Platform
            </p>
          </div>
          <Button onClick={simulateNewSession} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Simulate New Session
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Sessions Today</span>
              </div>
              <div className="text-2xl font-bold mt-1">{sessionsToday.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Threats Blocked</span>
              </div>
              <div className="text-2xl font-bold mt-1">{threatsBlocked}</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="text-2xl font-bold mt-1">98.3%</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">False Positives</span>
              </div>
              <div className="text-2xl font-bold mt-1">{falsePositives}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <RiskScoreCard 
              score={currentRisk.score}
              level={currentRisk.level}
              factors={currentRisk.factors}
            />
            
            <SignalMonitor />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <AuthFlowSimulator 
              riskLevel={currentRisk.level}
              onComplete={handleAuthComplete}
            />

            {authResult !== null && (
              <Card className={`border-border bg-card/50 backdrop-blur-sm border ${
                authResult ? 'border-success' : 'border-destructive'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    {authResult ? (
                      <>
                        <Shield className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">Authentication Successful</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 text-destructive" />
                        <span className="font-medium text-destructive">Authentication Failed</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {authResult 
                      ? "User has been granted access to banking services."
                      : "Session blocked due to security concerns."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {showRAG ? (
              <RAGChallenge onComplete={handleRAGComplete} />
            ) : (
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    RAG Challenge System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Conversational RAG (Retrieval-Augmented Generation) challenges are triggered when:
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                    <li>• Risk level 2-3 is detected</li>
                    <li>• Primary authentication fails</li>
                    <li>• Behavioral anomalies are present</li>
                    <li>• Device or network context is suspicious</li>
                  </ul>
                  <div className="p-3 bg-secondary/50 rounded border">
                    <div className="text-xs font-medium mb-1">Example Questions:</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>"Who did you last send ₹5,000 to?"</div>
                      <div>"What restaurant did you pay last Tuesday?"</div>
                      <div>"What was your last electricity bill amount?"</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  System Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Model Accuracy</span>
                    <span className="font-mono">94.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Response Time</span>
                    <span className="font-mono">120ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Models</span>
                    <span className="font-mono">3</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-xs text-muted-foreground">
                    <strong>Current Models:</strong> XGBoost Risk Scorer, LSTM Behavioral Analyzer, RAG Question Generator
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};