import React, { useEffect, useState } from 'react';
import { spotify } from '../lib/spotify';
import { TrackList } from '../components/TrackList';
import { Track } from '../types';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await spotify.recommendations.get({
          seed_genres: ['pop', 'electronic'],
          limit: 20,
        });
        setTopTracks(response.tracks);
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Groov</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
        <TrackList tracks={topTracks} />
      </section>
    </div>
  );
};