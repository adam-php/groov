import React, { useEffect, useState } from 'react';
import { getTopTracks, getRecentlyPlayed } from '@/lib/spotify';
import { TrackList } from '@/components/TrackList';
import { Track } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [topTracksData, recentTracksData] = await Promise.all([
          getTopTracks(10),
          getRecentlyPlayed(10)
        ]);

        setTopTracks(topTracksData);
        setRecentTracks(recentTracksData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch tracks:', err);
        setError('Failed to load tracks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
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

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Top Tracks</h2>
          {topTracks.length > 0 ? (
            <TrackList tracks={topTracks} showHeader showAlbum />
          ) : (
            <p className="text-muted-foreground">No top tracks found</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
          {recentTracks.length > 0 ? (
            <TrackList tracks={recentTracks} showHeader showAlbum />
          ) : (
            <p className="text-muted-foreground">No recently played tracks</p>
          )}
        </section>
      </div>
    </ScrollArea>
  );
};

export default Home;