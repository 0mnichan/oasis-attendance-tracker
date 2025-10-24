
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from './LoadingSpinner';
import TermsDialog from './TermsDialog';

const LoginForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  // Generate random captcha on mount and when refresh is clicked
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(result);
    setCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);
  
  const handleTermsAccept = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem('termsAccepted', 'true');
    }
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const handleTermsDecline = () => {
    toast.error('You must accept the terms to use OASIS');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions first');
      return;
    }
    
    if (!userId || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!captcha) {
      toast.error('Please enter the captcha');
      return;
    }

    if (captcha !== generatedCaptcha) {
      toast.error('Invalid captcha. Please try again.');
      generateCaptcha();
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would call your API here
      // For now, we'll just redirect
      
      toast.success('Successfully logged in', {
        description: 'Welcome to OASIS',
      });
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (error) {
      toast.error('Failed to login', {
        description: 'Please check your credentials',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <TermsDialog 
        open={showTerms}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />
      {termsAccepted && (
        <Card className="w-full max-w-md mx-auto glass-panel animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Login to OASIS</CardTitle>
            <CardDescription>
              Enter your SRM credentials to access your attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="userId" className="text-sm font-medium">
                  SRM User ID
                </label>
                <Input
                  id="userId"
                  placeholder="Enter your registration number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={isLoading}
                  className="transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your credentials are not stored by this application.
                </p>
              </div>
              
              {/* Captcha Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Captcha Verification</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted p-4 rounded-md border-2 border-border flex items-center justify-center">
                    <span className="text-2xl font-bold tracking-widest select-none" style={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.3em',
                      textDecoration: 'line-through wavy',
                      textDecorationColor: 'hsl(var(--primary))'
                    }}>
                      {generatedCaptcha}
                    </span>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={generateCaptcha}
                    disabled={isLoading}
                    className="px-3"
                  >
                    Change
                  </Button>
                </div>
                <Input
                  id="captcha"
                  placeholder="Enter captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  disabled={isLoading}
                  className="transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full relative overflow-hidden group"
            >
              <span className={`transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Sign In
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                </div>
              )}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default LoginForm;
