'use client';

import { ReactNode } from 'react';
import { withAuth } from './authWrapper';

interface ClientAuthProps {
  children: ReactNode;
}

function ClientAuthComponent({ children }: ClientAuthProps) {
  return <>{children}</>;
}

export const ClientAuth = withAuth(ClientAuthComponent); 