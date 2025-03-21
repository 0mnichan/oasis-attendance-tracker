
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/hooks/useAttendance";
import ProgressRing from './ProgressRing';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const getStatusColor = () => {
    if (course.percentage < course.minRequired) return 'bg-destructive/10 text-destructive';
    if (course.percentage <= course.minRequired + 5) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
    return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
  };
  
  const getStatusText = () => {
    if (course.canSkip < 0) return `Need to attend ${Math.abs(course.canSkip)} more`;
    if (course.canSkip === 0) return 'On threshold';
    return `Can skip ${course.canSkip} classes`;
  };
  
  return (
    <Card className={cn("overflow-hidden card-hover border", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">{course.code}</div>
            <CardTitle className="text-base font-medium">{course.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Attended: </span>
              <span className="font-medium">{course.attended}/{course.total}</span>
            </div>
            <div className={cn("text-xs px-2 py-1 rounded-full inline-block", getStatusColor())}>
              {getStatusText()}
            </div>
          </div>
          
          <ProgressRing 
            progress={course.percentage} 
            size={64} 
            strokeWidth={5}
            threshold={course.minRequired}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
