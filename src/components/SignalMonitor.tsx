import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  Wifi, 
  Shield, 
  MapPin, 
  Clock,
  Fingerprint,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Signal {
  id: string;
  name: string;
  value: string;
  status: 'safe' | 'warning' | 'danger';
  icon: any;
  description: string;
  weight: number;
}

interface SignalMonitorProps {
  className?: string;
}

const mockSignals: Signal[] = [
  {
    id: 'device',
    name: 'Device Trust',
    value: '92%',
    status: 'safe',
    icon: Smartphone,
    description: 'Known device, no root detected',
    weight: 25
  },
  {
    id: 'network',
    name: 'Network Context',
    value: '78%',
    status: 'warning',
    icon: Wifi,
    description: 'New WiFi network detected',
    weight: 20
  },
  {
    id: 'location',
    name: 'Geolocation',
    value: '85%',
    status: 'safe',
    icon: MapPin,
    description: 'Within normal range (12km)',
    weight: 15
  },
  {
    id: 'behavior',
    name: 'Behavioral Pattern',
    value: '94%',
    status: 'safe',
    icon: Fingerprint,
    description: 'Typing pattern matches',
    weight: 30
  },
  {
    id: 'sim',
    name: 'SIM Status',
    value: '45%',
    status: 'danger',
    icon: Shield,
    description: 'SIM swapped 2 days ago',
    weight: 10
  }
];

export const SignalMonitor = ({ className }: SignalMonitorProps) => {
  const signals = mockSignals;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'warning': return Clock;
      case 'danger': return AlertTriangle;
      default: return Shield;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'danger': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const overallScore = signals.reduce((acc, signal) => {
    const value = parseInt(signal.value.replace('%', ''));
    return acc + (value * signal.weight / 100);
  }, 0);

  return (
    <Card className={`border-border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Security Signals</span>
          <Badge variant={overallScore >= 80 ? 'default' : overallScore >= 60 ? 'secondary' : 'destructive'}>
            {Math.round(overallScore)}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {signals.map((signal) => {
            const Icon = signal.icon;
            const StatusIcon = getStatusIcon(signal.status);
            const value = parseInt(signal.value.replace('%', ''));
            
            return (
              <div key={signal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{signal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(signal.status)}`} />
                    <span className="text-sm font-mono">{signal.value}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(signal.status)}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-3 mt-4">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Risk Calculation:</span>
              <span>Weighted Average</span>
            </div>
            <div className="flex justify-between">
              <span>Update Frequency:</span>
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};