import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Camera, 
  MessageCircle, 
  Smartphone,
  CheckCircle,
  XCircle,
  Eye,
  Fingerprint,
  Lock
} from "lucide-react";

export const MobileAuthApp = () => {
  const [authStep, setAuthStep] = useState<'initial' | 'risk-check' | 'biometric' | 'rag-chat' | 'success' | 'failed'>('initial');
  const [riskLevel, setRiskLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isFaceScanning, setIsFaceScanning] = useState(false);

  const startAuthentication = () => {
    setAuthStep('risk-check');
    
    // Simulate risk assessment
    setTimeout(() => {
      const simulatedRisk = Math.floor(Math.random() * 5);
      setRiskLevel(simulatedRisk);
      
      if (simulatedRisk === 0) {
        setAuthStep('success');
      } else if (simulatedRisk === 1) {
        setAuthStep('biometric');
      } else {
        setAuthStep('rag-chat');
        generateRAGQuestion();
      }
    }, 2000);
  };

  const generateRAGQuestion = () => {
    const questions = [
      "What restaurant did you pay ₹850 to last Tuesday?",
      "Who did you last send ₹5,000 to via UPI?",
      "What was your last electricity bill amount?",
      "Which grocery store did you visit yesterday?",
      "What time did you usually login last week?"
    ];
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  const handleFacialScan = () => {
    setIsFaceScanning(true);
    setTimeout(() => {
      setIsFaceScanning(false);
      setAuthStep('success');
    }, 3000);
  };

  const handleRAGAnswer = () => {
    if (userAnswer.trim()) {
      // Simulate answer validation
      const isCorrect = Math.random() > 0.3; // 70% success rate
      if (isCorrect) {
        setAuthStep('success');
      } else {
        setAuthStep('failed');
      }
    }
  };

  const getRiskBadgeColor = (level: number) => {
    switch (level) {
      case 0: return "bg-success text-success-foreground";
      case 1: return "bg-warning text-warning-foreground";
      case 2: return "bg-orange-500 text-white";
      case 3: return "bg-destructive text-destructive-foreground";
      case 4: return "bg-red-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Mobile Phone Frame */}
        <div className="bg-card border-2 border-border rounded-[2.5rem] p-6 shadow-2xl">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-6">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-primary rounded-sm"></div>
              <div className="w-4 h-2 bg-primary/50 rounded-sm"></div>
              <div className="w-4 h-2 bg-muted rounded-sm"></div>
            </div>
          </div>

          {/* App Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BankShield
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">Secure Banking Access</p>
          </div>

          {/* Authentication Flow */}
          <div className="space-y-6">
            {authStep === 'initial' && (
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <Smartphone className="h-12 w-12 text-primary mx-auto" />
                  <div>
                    <h3 className="font-semibold mb-2">Ready to Login</h3>
                    <p className="text-sm text-muted-foreground">
                      BankShield will analyze your session and adapt security accordingly
                    </p>
                  </div>
                  <Button onClick={startAuthentication} className="w-full">
                    Start Secure Login
                  </Button>
                </CardContent>
              </Card>
            )}

            {authStep === 'risk-check' && (
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <div>
                    <h3 className="font-semibold mb-2">Analyzing Session</h3>
                    <p className="text-sm text-muted-foreground">
                      Checking device, location, and behavioral patterns...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {authStep === 'biometric' && (
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    {isFaceScanning ? (
                      <div className="h-32 w-32 border-4 border-primary rounded-full mx-auto flex items-center justify-center animate-pulse">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                    ) : (
                      <div className="h-32 w-32 border-2 border-dashed border-muted-foreground rounded-full mx-auto flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Badge className={getRiskBadgeColor(riskLevel)} variant="secondary">
                      Risk Level {riskLevel} - Medium Risk
                    </Badge>
                    <h3 className="font-semibold mt-2 mb-2">Facial Verification Required</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isFaceScanning 
                        ? "Scanning your face... Please stay still" 
                        : "We detected some unusual activity. Please verify your identity"
                      }
                    </p>
                  </div>
                  {!isFaceScanning && (
                    <Button onClick={handleFacialScan} className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Face Scan
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {authStep === 'rag-chat' && (
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <Badge className={getRiskBadgeColor(riskLevel)} variant="secondary">
                      Risk Level {riskLevel} - High Risk
                    </Badge>
                    <h3 className="font-semibold mt-2 mb-2">Security Challenge</h3>
                    <p className="text-sm text-muted-foreground">
                      Answer this question to verify your identity
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium">{currentQuestion}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      placeholder="Type your answer..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full"
                    />
                    <Button onClick={handleRAGAnswer} className="w-full" disabled={!userAnswer.trim()}>
                      Submit Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {authStep === 'success' && (
              <Card className="border-success bg-success/5">
                <CardContent className="p-6 text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-success mx-auto" />
                  <div>
                    <h3 className="font-semibold text-success mb-2">Authentication Successful</h3>
                    <p className="text-sm text-muted-foreground">
                      Welcome back! You can now access your banking services.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setAuthStep('initial')} className="w-full">
                    Continue to Banking
                  </Button>
                </CardContent>
              </Card>
            )}

            {authStep === 'failed' && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="p-6 text-center space-y-4">
                  <XCircle className="h-12 w-12 text-destructive mx-auto" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-2">Authentication Failed</h3>
                    <p className="text-sm text-muted-foreground">
                      Your session has been blocked for security reasons.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setAuthStep('initial')} className="w-full">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Security Indicators */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Protected</span>
              </div>
              <div className="flex items-center gap-1">
                <Fingerprint className="h-3 w-3" />
                <span>Biometric</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};