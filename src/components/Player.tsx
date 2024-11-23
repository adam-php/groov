import React, { useCallback, memo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { NowPlaying } from './NowPlaying';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';

export const Player: React.FC = memo(() => {
  const {
    isPlaying,
    volume,
    progress,
    repeat,
    shuffle,
    setIsPlaying,
    setVolume,
    setProgress,
    toggleRepeat,
    toggleShuffle,
    nextTrack,
    previousTrack,
  } = usePlayerStore();

  const handleVolumeChange = useCallback((value: number[]) => {
    setVolume(value[0]);
  }, [setVolume]);

  const handleProgressChange = useCallback((value: number[]) => {
    setProgress(value[0]);
  }, [setProgress]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <NowPlaying />
        
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn("hover:text-primary", shuffle && "text-primary")}
              onClick={toggleShuffle}
            >
              <Shuffle className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={previousTrack}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn("hover:text-primary", repeat && "text-primary")}
              onClick={toggleRepeat}
            >
              <Repeat className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="w-full flex items-center gap-2">
            <span className="text-sm text-muted-foreground">0:00</span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">3:45</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 min-w-[150px]">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
});