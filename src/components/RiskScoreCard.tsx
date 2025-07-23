import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, ShieldAlert, Ban } from "lucide-react";

interface RiskScoreCardProps {
  score: number;
  level: number;
  factors: string[];
  className?: string;
}

const getRiskConfig = (level: number) => {
  switch (level) {
    case 0:
      return {
        label: "No Risk",
        color: "success",
        icon: Shield,
        description: "All signals aligned"
      };
    case 1:
      return {
        label: "Low Risk",
        color: "primary",
        icon: Shield,
        description: "Minor deviations detected"
      };
    case 2:
      return {
        label: "Medium Risk",
        color: "warning",
        icon: AlertTriangle,
        description: "Moderate anomalies"
      };
    case 3:
      return {
        label: "High Risk",
        color: "destructive",
        icon: ShieldAlert,
        description: "Strong fraud indicators"
      };
    case 4:
      return {
        label: "Critical Risk",
        color: "critical",
        icon: Ban,
        description: "Confirmed threat detected"
      };
    default:
      return {
        label: "Unknown",
        color: "muted",
        icon: Shield,
        description: "Assessment pending"
      };
  }
};

export const RiskScoreCard = ({ score, level, factors, className }: RiskScoreCardProps) => {
  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <Card className={`border-border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icon className="h-4 w-4" />
            Risk Assessment
          </CardTitle>
          <Badge variant={config.color as any} className="text-xs">
            Level {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{score}/100</div>
          <div className="text-right">
            <div className="text-sm font-medium">{config.label}</div>
            <div className="text-xs text-muted-foreground">{config.description}</div>
          </div>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              level === 0 ? 'bg-success' :
              level === 1 ? 'bg-primary' :
              level === 2 ? 'bg-warning' :
              level === 3 ? 'bg-destructive' :
              'bg-critical'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        {factors.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Risk Factors:</div>
            <div className="space-y-1">
              {factors.slice(0, 3).map((factor, index) => (
                <div key={index} className="text-xs bg-secondary/50 px-2 py-1 rounded">
                  {factor}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};