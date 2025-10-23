import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Course } from '@/hooks/useAttendance';
import AttendanceChart from './AttendanceChart';
import ProgressRing from './ProgressRing';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface CourseDetailDialogProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({ course, open, onClose }) => {
  if (!course) return null;

  const attendanceStatus = course.percentage >= 75 ? 'good' : 'warning';
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{course.name}</DialogTitle>
          <DialogDescription>{course.code}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Overall Stats */}
          <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Overall Attendance</p>
              <p className="text-4xl font-bold mb-1">{course.percentage.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">
                {course.attended} out of {course.total} classes attended
              </p>
            </div>
            <ProgressRing 
              progress={course.percentage} 
              size={100} 
              strokeWidth={8}
            />
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Classes Attended</p>
              <p className="text-2xl font-bold">{course.attended}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Total Classes</p>
              <p className="text-2xl font-bold">{course.total}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Minimum Required</p>
              <p className="text-2xl font-bold">{course.minRequired}%</p>
            </div>
          </div>

          {/* Can Skip Analysis */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Leave Planning
            </h3>
            {course.canSkip > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-lg">You can skip {course.canSkip} {course.canSkip === 1 ? 'class' : 'classes'}</p>
                    <p className="text-sm text-muted-foreground">While maintaining minimum 75% attendance</p>
                  </div>
                </div>
              </div>
            ) : course.canSkip === 0 ? (
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-semibold text-lg">No room for absence</p>
                  <p className="text-sm text-muted-foreground">You're at the minimum threshold. Attend all upcoming classes.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                  <div>
                    <p className="font-semibold text-lg text-destructive">You need to attend {Math.abs(course.canSkip)} more {Math.abs(course.canSkip) === 1 ? 'class' : 'classes'}</p>
                    <p className="text-sm text-muted-foreground">To reach the minimum 75% attendance requirement</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attendance Visualization */}
          <div>
            <h3 className="font-semibold mb-4">Attendance Visualization</h3>
            <AttendanceChart courses={[course]} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
