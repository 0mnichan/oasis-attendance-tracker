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
    <div className="glass-panel p-4 sm:p-6 h-full">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold">Upcoming Hour</h3>
        <Badge variant="outline" className="ml-auto text-xs">Next Class</Badge>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Subject</p>
          <p className="text-base sm:text-lg font-semibold">{course.name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{course.code}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Current Attendance</p>
            <p className="text-xl sm:text-2xl font-bold">{course.percentage.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{course.attended}/{course.total} classes</p>
          </div>
          
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Can You Miss?</p>
            {canMiss ? (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                <span className="text-xl sm:text-2xl font-bold text-green-500">Yes</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 sm:w-5 h-4 sm:h-5 text-destructive" />
                <span className="text-xl sm:text-2xl font-bold text-destructive">No</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-3 sm:pt-4 border-t">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">If you miss this class:</p>
          <div className="flex items-center justify-between bg-muted/50 p-2 sm:p-3 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Attendance will drop to</p>
              <p className={`text-lg sm:text-xl font-bold ${percentageIfMissed >= 75 ? 'text-primary' : 'text-destructive'}`}>
                {percentageIfMissed.toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">New ratio</p>
              <p className="text-sm font-semibold">{attendedIfMissed}/{totalIfMissed}</p>
            </div>
          </div>
          {percentageIfMissed < 75 && (
            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Below minimum 75% requirement
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingClass;
