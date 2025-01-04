import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import type { UserRole } from '@/shared/types/auth';
import { getUsers } from '@/lib/db';
import { WithId, Document } from 'mongodb';

interface User extends WithId<Document> {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter both email and password');
          }

          const users = await getUsers();
          const user = await users.findOne<User>({ email: credentials.email.toLowerCase() });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          console.log('User authenticated:', { id: user._id.toString(), email: user.email, role: user.role });
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error('Auth Error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login
      if (url === '/dashboard') {
        return `${baseUrl}`;
      }
      // Handle relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Handle same origin URLs
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default to base URL
      return baseUrl;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
}; 