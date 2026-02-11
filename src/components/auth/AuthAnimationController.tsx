'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import AuthCard, { type AuthMode } from './AuthCard';
import AnimatedCharacter, { type AnimatedCharacterRef } from './AnimatedCharacter';

interface AuthAnimationControllerProps {
  initialMode?: AuthMode;
}

export default function AuthAnimationController({ initialMode = 'signup' }: AuthAnimationControllerProps) {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<AnimatedCharacterRef>(null);
  const characterContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initial entrance animation
  useEffect(() => {
    if (!isMounted || !containerRef.current || !cardRef.current || !characterContainerRef.current) return;

    // If reduced motion, just show content immediately
    if (prefersReducedMotion) {
      gsap.set(cardRef.current, { opacity: 1, x: 0 });
      gsap.set(characterContainerRef.current, { opacity: 0 });
      return;
    }

    const card = cardRef.current;
    const character = characterContainerRef.current;

    // Initial positions - off screen to the left
    gsap.set(card, { x: '-150%', opacity: 0 });
    gsap.set(character, { x: '-200px', opacity: 1 });

    // Create entrance timeline
    const tl = gsap.timeline({
      onStart: () => {
        setIsAnimating(true);
        characterRef.current?.playWalking();
      },
      onComplete: () => {
        setIsAnimating(false);
        characterRef.current?.playIdle();
      }
    });

    // Character enters fast from left
    tl.to(character, {
      x: -80,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Card slides in with character "pushing" it
    tl.to(card, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.2)'
    }, '-=0.4');

    // Character settles into idle position
    tl.to(character, {
      x: -100,
      duration: 0.3,
      ease: 'power2.inOut'
    }, '-=0.2');

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [isMounted, prefersReducedMotion]);

  // Handle mode switching with animation
  const handleModeSwitch = useCallback((newMode: AuthMode) => {
    if (isAnimating || !cardRef.current || !characterContainerRef.current || prefersReducedMotion) {
      setCurrentMode(newMode);
      return;
    }

    const card = cardRef.current;
    const character = characterContainerRef.current;

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      onStart: () => {
        setIsAnimating(true);
        characterRef.current?.playWalking();
      },
      onComplete: () => {
        setIsAnimating(false);
        characterRef.current?.playIdle();
      }
    });

    // Exit animation
    tl.to(card, {
      x: '120%',
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });

    tl.to(character, {
      x: -200,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.3');

    // Switch mode at midpoint
    tl.call(() => {
      setCurrentMode(newMode);
    });

    // Reset positions
    tl.set(card, { x: '-150%', opacity: 0 });
    tl.set(character, { x: -200 });

    // Character re-enters
    tl.to(character, {
      x: -80,
      duration: 0.5,
      ease: 'power2.out'
    });

    // New card slides in
    tl.to(card, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'back.out(1.4)'
    }, '-=0.3');

    // Character settles
    tl.to(character, {
      x: -100,
      duration: 0.25,
      ease: 'power2.inOut'
    }, '-=0.15');

    timelineRef.current = tl;
  }, [isAnimating, prefersReducedMotion]);

  // Show loading state before mount
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_50%)] -z-10" />

      {/* Animated glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full -z-10 animate-pulse" />

      {/* Main container */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full max-w-2xl"
      >
        {/* Animated Character */}
        <div
          ref={characterContainerRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          style={{
            opacity: prefersReducedMotion ? 0 : 1,
            pointerEvents: 'none'
          }}
        >
          <AnimatedCharacter
            ref={characterRef}
            size={100}
            className="transform -scale-x-100"
          />
        </div>

        {/* Auth Card */}
        <div ref={cardRef} className="relative z-20">
          <AuthCard
            mode={currentMode}
            onModeSwitch={handleModeSwitch}
          />
        </div>
      </div>
    </div>
  );
}
