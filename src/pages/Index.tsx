
import React, { useEffect } from 'react';
import LoginForm from '@/components/LoginForm';

const Index = () => {
  useEffect(() => {
    // Add a class to the body for the landing page
    document.body.classList.add('landing-page');
    
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            <span className="text-primary">OASIS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Optimal Attendance System for SRM Students
          </p>
        </div>
        
        <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <LoginForm />
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p>Your credentials are only used to fetch attendance data and are never stored.</p>
          <p className="mt-1">This is an unofficial tool and is not affiliated with SRM University.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
