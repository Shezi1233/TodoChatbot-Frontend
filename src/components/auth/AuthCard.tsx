'use client';

import { useState, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { CheckSquare, ArrowRight, Mail, Lock, User } from 'lucide-react';

export type AuthMode = 'signin' | 'signup';

interface AuthCardProps {
  mode: AuthMode;
  onModeSwitch?: (newMode: AuthMode) => void;
  className?: string;
}

const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(
  ({ mode, onModeSwitch, className = '' }, ref) => {
    const router = useRouter();
    const { signIn, signUp, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }
      }

      try {
        if (mode === 'signin') {
          await signIn(email, password);
        } else {
          await signUp(email, password, name);
        }
        router.push('/tasks');
      } catch (err) {
        setError(err instanceof Error ? err.message : `${mode === 'signin' ? 'Sign in' : 'Sign up'} failed`);
      }
    };

    const handleModeSwitch = (e: React.MouseEvent) => {
      e.preventDefault();
      const newMode = mode === 'signin' ? 'signup' : 'signin';
      onModeSwitch?.(newMode);
    };

    return (
      <div
        ref={ref}
        className={`w-full max-w-md ${className}`}
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 group mb-6">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-foreground uppercase">
              Task<span className="text-primary">Flow</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Workspace'}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === 'signin'
              ? 'Enter your details to access your workspace'
              : 'Start organizing your life with TaskFlow'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card/50 border border-border p-8 rounded-3xl backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={mode === 'signup' ? 'space-y-4' : 'space-y-6'}>
            {/* Name field - only for signup */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground px-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground px-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                  Password
                </label>
                {mode === 'signin' && (
                  <a href="#" className="text-[10px] uppercase tracking-widest font-black text-primary hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password - only for signup */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground px-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="yellow"
              size="lg"
              className="w-full rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Mode switch link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={handleModeSwitch}
                className="text-primary font-semibold hover:underline focus:outline-none"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AuthCard.displayName = 'AuthCard';

export default AuthCard;
