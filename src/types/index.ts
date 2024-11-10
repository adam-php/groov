export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
}

export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  volume: number;
  progress: number;
  repeat: 'off' | 'track' | 'context';
  shuffle: boolean;
}