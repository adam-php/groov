import React from 'react';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  showAlbum?: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  showHeader = true,
  showAlbum = true,
}) => {
  const { setCurrentTrack, setQueue } = usePlayerStore();

  const handlePlay = (track: Track, index: number) => {
    setCurrentTrack(track);
    setQueue(tracks.slice(index));
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full">
      {showHeader && (
        <div className="grid grid-cols-[16px,4fr,2fr,1fr] gap-4 px-4 py-2 text-gray-400 text-sm border-b border-purple-900/30">
          <div>#</div>
          <div>Title</div>
          {showAlbum && <div>Album</div>}
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>
      )}
      <div className="space-y-2 mt-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="group grid grid-cols-[16px,4fr,2fr,1fr] gap-4 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-colors items-center"
          >
            <div className="text-gray-400 group-hover:hidden">{index + 1}</div>
            <button
              onClick={() => handlePlay(track, index)}
              className="hidden group-hover:block text-purple-400"
            >
              <Play size={16} />
            </button>
            <div className="flex items-center space-x-4">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-10 h-10 rounded-md"
              />
              <div className="min-w-0">
                <h3 className="text-white font-medium truncate">{track.name}</h3>
                <p className="text-gray-400 text-sm truncate hover:text-purple-400 transition-colors">
                  {track.artists[0].name}
                </p>
              </div>
            </div>
            {showAlbum && (
              <div className="text-gray-400 hover:text-purple-400 transition-colors truncate">
                {track.album.name}
              </div>
            )}
            <div className="flex items-center justify-end space-x-4">
              <span className="text-gray-400 text-sm">
                {formatDuration(track.duration_ms)}
              </span>
              <button className="text-gray-400 hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};