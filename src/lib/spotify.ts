import { SpotifyApi, Track, PlaybackState } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || window.location.origin + '/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-top-read',
  'playlist-read-private',
  'playlist-read-collaborative',
] as const;

if (!CLIENT_ID) {
  throw new Error('VITE_SPOTIFY_CLIENT_ID is not defined in environment variables');
}
// Debug: Log configuration details
console.log('Spotify API Configuration:', { CLIENT_ID, REDIRECT_URI, SCOPES });

export const spotify = (() => {
  try {
    const api = SpotifyApi.withUserAuthorization(CLIENT_ID, REDIRECT_URI);
    console.log('Spotify API instance created successfully');
    return api;
  } catch (error) {
    console.error('Failed to create Spotify API instance:', error);
    throw error;
  }
})();

// Type for Spotify API limit parameter (0-50)
type SpotifyLimit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
  21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
  31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
  41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;

// Helper function to validate limit

// Helper functions for common Spotify operations
export async function getUserProfile() {
  try {
    return await spotify.currentUser.profile();
  } catch (error) {
    console.error('Failed to get user profile:', error);
    throw error;
  }
}

export async function getTopTracks(limit: SpotifyLimit = 20): Promise<Track[]> {
  try {
    const response = await spotify.currentUser.topItems('tracks', 'short_term', limit);
    return response.items;
  } catch (error) {
    console.error('Failed to get top tracks:', error);
    throw error;
  }
}

export async function getRecentlyPlayed(limit: SpotifyLimit = 20): Promise<Track[]> {
  try {
    const response = await spotify.player.getRecentlyPlayedTracks(limit);
    return response.items.map(item => item.track);
  } catch (error) {
    console.error('Failed to get recently played tracks:', error);
    throw error;
  }
}

export async function searchTracks(query: string, limit: SpotifyLimit = 20): Promise<Track[]> {
  try {
    if (!query.trim()) return [];
    const response = await spotify.search(query, ['track'], undefined, limit);
    return response.tracks.items;
  } catch (error) {
    console.error('Failed to search tracks:', error);
    throw error;
  }
}

export async function getSavedTracks(limit: SpotifyLimit = 20): Promise<Track[]> {
  try {
    const response = await spotify.currentUser.tracks.savedTracks(limit);
    return response.items.map(item => item.track);
  } catch (error) {
    console.error('Failed to get saved tracks:', error);
    throw error;
  }
}

export async function togglePlayback(isPlaying: boolean, deviceId?: string): Promise<void> {
  try {
    if (isPlaying) {
      await spotify.player.pausePlayback(deviceId as string);
    } else {
      await spotify.player.startResumePlayback(deviceId as string);
    }
  } catch (error) {
    console.error('Failed to toggle playback:', error);
    throw error;
  }
}

export async function seekToPosition(positionMs: number, deviceId?: string): Promise<void> {
  try {
    await spotify.player.seekToPosition(positionMs, deviceId);
  } catch (error) {
    console.error('Failed to seek to position:', error);
    throw error;
  }
}

export async function setPlaybackVolume(volumePercent: number, deviceId?: string): Promise<void> {
  try {
    const volume = Math.max(0, Math.min(100, Math.round(volumePercent)));
    await spotify.player.setPlaybackVolume(volume, deviceId);
  } catch (error) {
    console.error('Failed to set volume:', error);
    throw error;
  }
}

export async function nextTrack(deviceId?: string): Promise<void> {
  try {
    await spotify.player.skipToNext(deviceId as string);
  } catch (error) {
    console.error('Failed to skip to next track:', error);
    throw error;
  }
}

export async function previousTrack(deviceId?: string): Promise<void> {
  try {
    await spotify.player.skipToPrevious(deviceId as string);
  } catch (error) {
    console.error('Failed to skip to previous track:', error);
    throw error;
  }
}

export async function getCurrentPlayback(): Promise<PlaybackState | null> {
  try {
    return await spotify.player.getPlaybackState();
  } catch (error) {
    console.error('Failed to get current playback:', error);
    throw error;
  }
}
