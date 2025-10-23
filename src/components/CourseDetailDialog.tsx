import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Course } from '@/hooks/useAttendance';
import ProgressRing from './ProgressRing';
import { AlertCircle, CheckCircle2, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CourseDetailDialogProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({ course, open, onClose }) => {
  const [classesToMiss, setClassesToMiss] = useState(0);
  const [classesToAttend, setClassesToAttend] = useState(0);
  
  if (!course) return null;
  
  // Calculate attendance after simulation
  const simulateAttendance = () => {
    const totalAfter = course.total + classesToMiss + classesToAttend;
    const attendedAfter = course.attended + classesToAttend;
    const percentageAfter = (attendedAfter / totalAfter) * 100;
    return {
      total: totalAfter,
      attended: attendedAfter,
      percentage: percentageAfter.toFixed(2)
    };
  };
  
  const simulation = simulateAttendance();
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{course.name}</DialogTitle>
          <DialogDescription>
            Course Code: {course.code}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 py-4">
          {/* Current Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-muted/50 rounded-lg">
            <div className="w-full sm:flex-1">
              <p className="text-sm text-muted-foreground mb-1">Current Attendance</p>
              <p className="text-3xl sm:text-4xl font-bold">{course.percentage.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                {course.attended} of {course.total} classes attended
              </p>
              <div className="mt-3">
                {course.canSkip >= 0 ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Can miss {course.canSkip} classes
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Need to attend {Math.abs(course.canSkip)} more
                  </Badge>
                )}
              </div>
            </div>
            <ProgressRing 
              progress={course.percentage} 
              size={window.innerWidth < 640 ? 100 : 120} 
              strokeWidth={8}
            />
          </div>

          {/* Attendance Calculator */}
          <div className="p-4 sm:p-6 border rounded-lg space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold">Attendance Calculator</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="miss">Classes to Miss</Label>
                <Input
                  id="miss"
                  type="number"
                  min="0"
                  value={classesToMiss}
                  onChange={(e) => setClassesToMiss(Math.max(0, parseInt(e.target.value) || 0))}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attend">Classes to Attend</Label>
                <Input
                  id="attend"
                  type="number"
                  min="0"
                  value={classesToAttend}
                  onChange={(e) => setClassesToAttend(Math.max(0, parseInt(e.target.value) || 0))}
                  className="text-lg"
                />
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setClassesToMiss(0);
                setClassesToAttend(0);
              }}
            >
              Reset
            </Button>

            {/* Simulation Result */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Projected Attendance</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-primary">{simulation.percentage}%</span>
                <span className="text-sm text-muted-foreground">
                  ({simulation.attended}/{simulation.total} classes)
                </span>
              </div>
              {parseFloat(simulation.percentage) < course.minRequired && (
                <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Below minimum requirement of {course.minRequired}%
                </p>
              )}
              {parseFloat(simulation.percentage) >= course.minRequired && (classesToMiss > 0 || classesToAttend > 0) && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Above minimum requirement!
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
