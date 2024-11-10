import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Heart } from 'lucide-react';

export const NowPlaying: React.FC = () => {
  const { currentTrack } = usePlayerStore();

  if (!currentTrack) return null;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative group">
        <img
          src={currentTrack.album.images[0].url}
          alt={currentTrack.album.name}
          className="w-14 h-14 rounded-lg shadow-lg shadow-purple-500/20"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <button className="text-white hover:text-purple-400 transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-white font-medium line-clamp-1 hover:text-purple-400 cursor-pointer transition-colors">
          {currentTrack.name}
        </h3>
        <p className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
          {currentTrack.artists[0].name}
        </p>
      </div>
    </div>
  );
};