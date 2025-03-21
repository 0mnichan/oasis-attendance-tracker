
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import CourseCard from '@/components/CourseCard';
import AttendanceChart from '@/components/AttendanceChart';
import BunkPlanner from '@/components/BunkPlanner';
import { useAttendance } from '@/hooks/useAttendance';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProgressRing from '@/components/ProgressRing';
import { toast } from 'sonner';

const Dashboard = () => {
  const { data, isLoading, error } = useAttendance();
  const navigate = useNavigate();
  
  // Update the route and show a loading state while data fetches
  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch data', {
        description: 'Please try again later',
        duration: 5000,
      });
    }
  }, [error]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Fetching your attendance data</h2>
          <p className="text-muted-foreground">This may take a moment...</p>
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center max-w-md p-4">
          <h2 className="text-xl font-medium mb-2 text-destructive">Failed to load data</h2>
          <p className="text-muted-foreground mb-4">There was an error fetching your attendance data.</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <NavBar />
      
      <main className="container mx-auto pt-24 px-4">
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-2xl font-bold mb-1">Attendance Dashboard</h1>
          <p className="text-muted-foreground">
            Last updated: {data.lastUpdated.toLocaleString()}
          </p>
        </div>
        
        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="col-span-1 glass-panel p-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Overall Attendance</h3>
              <p className="text-3xl font-bold">{data.overallPercentage.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.totalClassesAttended} of {data.totalClassesHeld} classes
              </p>
            </div>
            <ProgressRing 
              progress={data.overallPercentage} 
              size={80} 
              strokeWidth={6}
              showPercentage={false}
            />
          </div>
          
          <div className="col-span-1 glass-panel p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Classes Attended</h3>
            <p className="text-3xl font-bold">{data.totalClassesAttended}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Across {data.courses.length} courses
            </p>
          </div>
          
          <div className="col-span-1 glass-panel p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Classes You Can Skip</h3>
            <p className="text-3xl font-bold">
              {data.courses.reduce((total, course) => total + Math.max(0, course.canSkip), 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              While maintaining minimum 75% attendance
            </p>
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-bold mb-4">Course Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        {/* Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AttendanceChart courses={data.courses} className="lg:col-span-2" />
          <BunkPlanner courses={data.courses} className="lg:col-span-1" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
