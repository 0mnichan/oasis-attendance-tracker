import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Period {
  time: string;
  subject: string;
}

interface DaySchedule {
  day: string;
  periods: Period[];
}

const Timetable: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [currentPeriod, setCurrentPeriod] = useState<number>(-1);

  // Mock timetable data - replace with actual data
  const timetable: DaySchedule[] = [
    {
      day: 'Monday',
      periods: [
        { time: '08:00-09:00', subject: 'Data Structures' },
        { time: '09:00-10:00', subject: 'Operating Systems' },
        { time: '10:00-11:00', subject: 'Computer Networks' },
        { time: '11:00-12:00', subject: 'Database Management' },
        { time: '12:00-13:00', subject: 'Lunch Break' },
        { time: '13:00-14:00', subject: 'Web Development' },
        { time: '14:00-15:00', subject: 'Software Engineering' },
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { time: '08:00-09:00', subject: 'Algorithms' },
        { time: '09:00-10:00', subject: 'Machine Learning' },
        { time: '10:00-11:00', subject: 'Cloud Computing' },
        { time: '11:00-12:00', subject: 'AI Lab' },
        { time: '12:00-13:00', subject: 'Lunch Break' },
        { time: '13:00-14:00', subject: 'Mobile Development' },
        { time: '14:00-15:00', subject: 'Project Work' },
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { time: '08:00-09:00', subject: 'Data Structures' },
        { time: '09:00-10:00', subject: 'Operating Systems' },
        { time: '10:00-11:00', subject: 'Computer Networks' },
        { time: '11:00-12:00', subject: 'Database Management' },
        { time: '12:00-13:00', subject: 'Lunch Break' },
        { time: '13:00-14:00', subject: 'Web Development' },
        { time: '14:00-15:00', subject: 'Software Engineering' },
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { time: '08:00-09:00', subject: 'Algorithms' },
        { time: '09:00-10:00', subject: 'Machine Learning' },
        { time: '10:00-11:00', subject: 'Cloud Computing' },
        { time: '11:00-12:00', subject: 'AI Lab' },
        { time: '12:00-13:00', subject: 'Lunch Break' },
        { time: '13:00-14:00', subject: 'Mobile Development' },
        { time: '14:00-15:00', subject: 'Project Work' },
      ]
    },
    {
      day: 'Friday',
      periods: [
        { time: '08:00-09:00', subject: 'Data Structures' },
        { time: '09:00-10:00', subject: 'Operating Systems' },
        { time: '10:00-11:00', subject: 'Computer Networks' },
        { time: '11:00-12:00', subject: 'Database Management' },
        { time: '12:00-13:00', subject: 'Lunch Break' },
        { time: '13:00-14:00', subject: 'Seminar' },
        { time: '14:00-15:00', subject: 'Library' },
      ]
    },
  ];

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Adjust day (Monday = 0 in our array)
      const adjustedDay = day === 0 ? -1 : day - 1; // Sunday = -1, Monday = 0, etc.
      setCurrentDay(adjustedDay);

      // Determine current period based on time
      if (adjustedDay >= 0 && adjustedDay < 5) {
        const periods = timetable[adjustedDay].periods;
        let foundPeriod = -1;

        for (let i = 0; i < periods.length; i++) {
          const [startTime, endTime] = periods[i].time.split('-');
          const [startHour, startMin] = startTime.split(':').map(Number);
          const [endHour, endMin] = endTime.split(':').map(Number);

          const currentTimeInMinutes = currentHour * 60 + currentMinute;
          const startTimeInMinutes = startHour * 60 + startMin;
          const endTimeInMinutes = endHour * 60 + endMin;

          if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
            foundPeriod = i;
            break;
          }
        }
        setCurrentPeriod(foundPeriod);
      }
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Timetable</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Weekly Timetable</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {timetable.map((daySchedule, dayIndex) => {
            const isCurrentDay = dayIndex === currentDay;
            return (
              <div
                key={daySchedule.day}
                className={cn(
                  "rounded-lg border p-4 transition-all duration-300",
                  isCurrentDay && "bg-primary/5 border-primary shadow-lg"
                )}
              >
                <h3 className={cn(
                  "font-semibold mb-3 text-lg",
                  isCurrentDay && "text-primary"
                )}>
                  {daySchedule.day}
                  {isCurrentDay && <span className="ml-2 text-sm font-normal">(Today)</span>}
                </h3>
                <div className="space-y-2">
                  {daySchedule.periods.map((period, periodIndex) => {
                    const isCurrentPeriod = isCurrentDay && periodIndex === currentPeriod;
                    return (
                      <div
                        key={periodIndex}
                        className={cn(
                          "flex items-center justify-between p-2 rounded transition-all duration-300",
                          period.subject === 'Lunch Break' && "bg-muted/50",
                          isCurrentPeriod && "bg-primary text-primary-foreground animate-pulse shadow-md"
                        )}
                      >
                        <span className="text-sm font-medium">{period.time}</span>
                        <span className={cn(
                          "text-sm",
                          isCurrentPeriod ? "font-bold" : "text-muted-foreground"
                        )}>
                          {period.subject}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Timetable;
