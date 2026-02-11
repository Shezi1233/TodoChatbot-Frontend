import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TaskFlow - Sign In or Sign Up',
  description: 'Access your TaskFlow workspace or create a new account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
