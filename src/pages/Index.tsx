import { BankShieldDashboard } from "@/components/BankShieldDashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Smartphone, Monitor } from "lucide-react";

const Index = () => {
  return (
    <div>
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to="/" className="gap-2">
            <Monitor className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/mobile" className="gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile App
          </Link>
        </Button>
      </div>
      
      <BankShieldDashboard />
    </div>
  );
};

export default Index;
