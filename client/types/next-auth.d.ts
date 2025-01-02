import 'next-auth';
import { UserRole } from '@/shared/types/auth';

declare module 'next-auth' {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user: User & {
      role?: UserRole;
    };
  }
}

declare module '@auth/mongodb-adapter' {
  interface AdapterUser {
    role?: UserRole;
  }
} 