import React from 'react';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { Track } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { ScrollArea } from './ui/scroll-area';

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
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {showHeader && (
          <div className="grid grid-cols-[16px,4fr,2fr,1fr] gap-4 px-4 py-2 text-sm text-muted-foreground">
            <div>#</div>
            <div>Title</div>
            {showAlbum && <div>Album</div>}
            <div className="flex justify-end">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        )}

        {tracks.map((track, index) => (
          <Card
            key={track.id}
            className="group grid grid-cols-[16px,4fr,2fr,1fr] items-center gap-4 px-4 py-2 hover:bg-accent/50"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-0 group-hover:opacity-100"
              onClick={() => handlePlay(track, index)}
            >
              <Play className="h-3 w-3" />
            </Button>

            <div className="flex items-center gap-3 min-w-0">
              {track.album?.images?.[0]?.url && (
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  className="h-10 w-10 rounded-md"
                />
              )}
              <div className="truncate">
                <div className="truncate font-medium">{track.name}</div>
                <div className="truncate text-sm text-muted-foreground">
                  {track.artists.map(a => a.name).join(', ')}
                </div>
              </div>
            </div>

            {showAlbum && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="truncate text-sm text-muted-foreground cursor-pointer">
                    {track.album?.name}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex space-x-4">
                    {track.album?.images?.[0]?.url && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        className="h-24 w-24 rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold">{track.album?.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        By {track.artists.map(a => a.name).join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {track.album?.release_date?.split('-')[0]}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}

            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
              <span>{formatDuration(track.duration_ms)}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};