import React, { useCallback, useRef, memo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { NowPlaying } from './NowPlaying';

export const Player: React.FC = memo(() => {
  const {
    isPlaying,
    volume,
    progress,
    repeat,
    shuffle,
    setIsPlaying,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    nextTrack,
    previousTrack,
  } = usePlayerStore();

  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    usePlayerStore.setState({ progress: Math.min(100, Math.max(0, percent)) });
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  }, [setVolume]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-purple-900/30 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NowPlaying />

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full ${
                  shuffle ? 'text-purple-400' : 'text-gray-400'
                } hover:text-purple-300 transition-colors`}
                aria-label="Toggle shuffle"
              >
                <Shuffle size={20} />
              </button>
              <button
                onClick={previousTrack}
                className="p-2 rounded-full text-gray-400 hover:text-purple-300 transition-colors"
                aria-label="Previous track"
              >
                <SkipBack size={22} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 rounded-full text-gray-400 hover:text-purple-300 transition-colors"
                aria-label="Next track"
              >
                <SkipForward size={22} />
              </button>
              <button
                onClick={toggleRepeat}
                className={`p-2 rounded-full ${
                  repeat !== 'off' ? 'text-purple-400' : 'text-gray-400'
                } hover:text-purple-300 transition-colors`}
                aria-label="Toggle repeat"
              >
                <Repeat size={20} />
              </button>
            </div>

            <div className="w-96 mt-2">
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="h-1 bg-purple-900/30 rounded-full cursor-pointer group"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-purple-500 group-hover:bg-purple-400 rounded-full relative transition-colors"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-purple-500"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
});