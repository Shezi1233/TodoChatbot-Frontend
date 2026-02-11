'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface GetStartedButtonProps {
  className?: string;
  variant?: 'yellow' | 'outline';
  size?: 'default' | 'lg' | 'xl';
  children?: React.ReactNode;
}

/**
 * GetStartedButton
 * ----------------
 * CTA button that navigates to the animated auth page.
 * Use this in your landing page Hero or CTA sections.
 *
 * Example:
 * <GetStartedButton variant="yellow" size="xl">
 *   Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
 * </GetStartedButton>
 */
export default function GetStartedButton({
  className = '',
  variant = 'yellow',
  size = 'xl',
  children
}: GetStartedButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to animated auth page
    router.push('/auth');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)] ${className}`}
    >
      {children || (
        <>
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}
