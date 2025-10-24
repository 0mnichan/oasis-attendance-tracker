import React from 'react';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { Course } from '@/hooks/useAttendance';
import { Badge } from './ui/badge';

interface UpcomingClassProps {
  course: Course;
}

const UpcomingClass: React.FC<UpcomingClassProps> = ({ course }) => {
  // Calculate what happens if they miss
  const attendedIfMissed = course.attended;
  const totalIfMissed = course.total + 1;
  const percentageIfMissed = (attendedIfMissed / totalIfMissed) * 100;
  
  const canMiss = course.canSkip > 0;
  
  return (
    <div className="glass-panel p-6 sm:p-8 h-full">
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
        <h3 className="text-lg sm:text-xl font-semibold">Upcoming Hour</h3>
        <Badge variant="outline" className="ml-auto">Next Class</Badge>
      </div>
      
      <div className="space-y-6">
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{course.name}</p>
        </div>
        
        <div className="pt-4 border-t space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Attendance Percentage</p>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl sm:text-5xl font-bold">{course.percentage.toFixed(1)}%</p>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Classes Attended</p>
                <p className="text-4xl sm:text-5xl font-bold">{course.attended}/{course.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 sm:p-5 rounded-lg space-y-3">
            <p className="text-sm text-muted-foreground">If you miss this class:</p>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Attendance will drop to</p>
              <div className="flex items-baseline gap-3">
                <p className={`text-3xl sm:text-4xl font-bold ${percentageIfMissed >= 75 ? 'text-primary' : 'text-destructive'}`}>
                  {percentageIfMissed.toFixed(1)}%
                </p>
                <p className="text-lg font-semibold text-muted-foreground">{attendedIfMissed}/{totalIfMissed}</p>
              </div>
            </div>
            {percentageIfMissed < 75 && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                Below minimum 75% requirement
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingClass;
