import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchTracks } from '@/lib/spotify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrackList } from '@/components/TrackList';
import { Track } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const tracks = await searchTracks(searchQuery, 20);
      setSearchResults(tracks);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search tracks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4 max-w-2xl">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for songs, artists, or albums..."
            className="w-full pl-10 pr-4 py-2 bg-background/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {searchResults.length > 0 ? (
        <TrackList
          tracks={searchResults}
          showHeader
          showAlbum
        />
      ) : searchQuery.trim() && !isLoading && !error ? (
        <div className="text-center text-muted-foreground">
          No tracks found for "{searchQuery}"
        </div>
      ) : null}

      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTrack?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4">
            {selectedTrack?.album?.images?.[0]?.url && (
              <img
                src={selectedTrack.album.images[0].url}
                alt={selectedTrack.name}
                className="w-32 h-32 rounded-lg"
              />
            )}
            <div>
              <h3 className="font-medium">{selectedTrack?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedTrack?.artists?.map(a => a.name).join(', ')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Album: {selectedTrack?.album?.name}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
