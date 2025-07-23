import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  Shield, 
  Video, 
  MessageCircle, 
  CheckCircle,
  Clock,
  Fingerprint,
  Eye
} from "lucide-react";

interface AuthStep {
  id: string;
  name: string;
  icon: any;
  status: 'pending' | 'active' | 'completed' | 'failed';
  description: string;
}

interface AuthFlowSimulatorProps {
  riskLevel: number;
  onComplete: (success: boolean) => void;
}

export const AuthFlowSimulator = ({ riskLevel, onComplete }: AuthFlowSimulatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const getAuthSteps = (level: number): AuthStep[] => {
    switch (level) {
      case 0:
        return [
          { id: 'passive', name: 'Passive Biometrics', icon: Fingerprint, status: 'pending', description: 'Analyzing typing patterns' },
          { id: 'complete', name: 'Access Granted', icon: CheckCircle, status: 'pending', description: 'Session authenticated' }
        ];
      case 1:
        return [
          { id: 'motion', name: 'Motion Analysis', icon: Smartphone, status: 'pending', description: 'Verifying device motion' },
          { id: 'gesture', name: 'Gesture Pattern', icon: Shield, status: 'pending', description: 'Drawing verification' },
          { id: 'complete', name: 'Access Granted', icon: CheckCircle, status: 'pending', description: 'Session authenticated' }
        ];
      case 2:
        return [
          { id: 'liveness', name: 'Liveness Check', icon: Eye, status: 'pending', description: 'Facial verification' },
          { id: 'rag', name: 'RAG Challenge', icon: MessageCircle, status: 'pending', description: 'Memory-based questions' },
          { id: 'complete', name: 'Access Granted', icon: CheckCircle, status: 'pending', description: 'Session authenticated' }
        ];
      case 3:
        return [
          { id: 'video', name: 'Video KYC', icon: Video, status: 'pending', description: 'Live verification call' },
          { id: 'attestation', name: 'Hardware Attestation', icon: Shield, status: 'pending', description: 'Cryptographic proof' },
          { id: 'complete', name: 'Access Granted', icon: CheckCircle, status: 'pending', description: 'Session authenticated' }
        ];
      case 4:
        return [
          { id: 'block', name: 'Access Blocked', icon: Shield, status: 'failed', description: 'Session terminated for security' }
        ];
      default:
        return [];
    }
  };

  const [steps, setSteps] = useState<AuthStep[]>(getAuthSteps(riskLevel));

  const simulateAuth = async () => {
    setIsRunning(true);
    const authSteps = getAuthSteps(riskLevel);
    setSteps(authSteps);
    
    if (riskLevel === 4) {
      // Immediate block for critical risk
      setSteps(prev => prev.map(step => ({ ...step, status: 'failed' })));
      onComplete(false);
      setIsRunning(false);
      return;
    }

    for (let i = 0; i < authSteps.length; i++) {
      setCurrentStep(i);
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'active' : index < i ? 'completed' : 'pending'
      })));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate potential failure for high risk
      if (riskLevel === 3 && Math.random() < 0.3) {
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index <= i ? 'failed' : 'pending'
        })));
        onComplete(false);
        setIsRunning(false);
        return;
      }
    }

    setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
    onComplete(true);
    setIsRunning(false);
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const progress = steps.length > 0 ? (steps.filter(s => s.status === 'completed').length / steps.length) * 100 : 0;

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Authentication Flow</span>
          <Badge variant={riskLevel <= 1 ? 'default' : riskLevel <= 2 ? 'secondary' : 'destructive'}>
            Risk Level {riskLevel}
          </Badge>
        </CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  step.status === 'active' ? 'bg-primary/10 border-primary' :
                  step.status === 'completed' ? 'bg-success/10 border-success' :
                  step.status === 'failed' ? 'bg-destructive/10 border-destructive' :
                  'bg-secondary/50 border-secondary'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  step.status === 'active' ? 'bg-primary text-primary-foreground' :
                  step.status === 'completed' ? 'bg-success text-success-foreground' :
                  step.status === 'failed' ? 'bg-destructive text-destructive-foreground' :
                  'bg-secondary text-secondary-foreground'
                }`}>
                  {step.status === 'active' ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.name}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                <Badge variant={getStepColor(step.status) as any} className="text-xs">
                  {step.status}
                </Badge>
              </div>
            );
          })}
        </div>

        <Button 
          onClick={simulateAuth} 
          disabled={isRunning}
          className="w-full"
          variant={riskLevel === 4 ? 'destructive' : 'default'}
        >
          {isRunning ? 'Authenticating...' : riskLevel === 4 ? 'Access Blocked' : 'Start Authentication'}
        </Button>
      </CardContent>
    </Card>
  );
};