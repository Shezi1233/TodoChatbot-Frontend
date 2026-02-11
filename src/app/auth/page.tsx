'use client';

import { AuthAnimationController } from '@/components/auth';

// Animated Auth Page with Character Animation
// Access via /auth
// Character enters from left and brings the form onto the screen
export default function AnimatedAuthPage() {
  return <AuthAnimationController initialMode="signup" />;
}
