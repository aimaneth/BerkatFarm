import { useSession, signOut } from 'next-auth/react';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// TODO: Set this to false in production
const DEVELOPMENT_MODE = true;

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/auth/login'
      });
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/auth/login');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          Welcome, {session?.user?.name || 'User'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {DEVELOPMENT_MODE ? 'Development Mode' : session?.user?.role || 'Guest'}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Link href="/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 