import React from 'react';
import { Home, Search, Library, PlusCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Library', icon: Library, path: '/library' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-full glass flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 p-0.5 animate-glow">
            <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                G
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 text-transparent bg-clip-text animate-gradient">
            Groov
          </h1>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                'w-full justify-start space-x-3',
                location.pathname === item.path
                  ? 'bg-primary/20 text-primary-foreground hover:bg-primary/30'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              asChild
            >
              <Link to={item.path}>
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="px-6 mt-8">
        <h2 className="text-muted-foreground font-medium px-4 mb-4">Your Playlists</h2>
        <Button
          variant="ghost"
          className="w-full justify-start space-x-2 text-muted-foreground hover:text-foreground group"
        >
          <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <PlusCircle size={18} />
          </div>
          <span className="font-medium">Create Playlist</span>
        </Button>
      </div>

      <div className="mt-auto p-6">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="font-medium mt-1">John Doe</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};