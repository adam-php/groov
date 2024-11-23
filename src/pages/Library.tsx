import React, { useEffect, useState } from 'react';
import { Library as LibraryIcon } from 'lucide-react';
import { getSavedTracks } from '@/lib/spotify';
import { TrackList } from '@/components/TrackList';
import { Track } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Library: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSavedTracks() {
      try {
        setIsLoading(true);
        const tracks = await getSavedTracks(20);
        setSavedTracks(tracks);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch saved tracks:', err);
        setError('Failed to load your library. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavedTracks();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (savedTracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LibraryIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Your Library is Empty</h2>
          <p className="text-muted-foreground">
            Save some tracks to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Library</h1>
        <TrackList tracks={savedTracks} showHeader showAlbum />
      </div>
    </ScrollArea>
  );
};

export default Library;
