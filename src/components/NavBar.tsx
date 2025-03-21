
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { LogOut, BarChart2, Calendar, Settings } from 'lucide-react';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      navigate('/');
    }, 300);
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-b z-50",
      className
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-primary font-semibold text-xl">OASIS</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Beta</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <BarChart2 className="w-4 h-4 mr-2" />
            Statistics
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Planner
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
