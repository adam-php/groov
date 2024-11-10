import { create } from 'zustand';
import { PlayerState, Track } from '../types';

interface PlayerStore extends PlayerState {
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  queue: [],
  volume: 1,
  progress: 0,
  repeat: 'off',
  shuffle: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setQueue: (tracks) => set({ queue: tracks }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  toggleRepeat: () => {
    const repeat = get().repeat;
    set({ repeat: repeat === 'off' ? 'track' : repeat === 'track' ? 'context' : 'off' });
  },
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  nextTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((track) => track.id === currentTrack?.id);
    const nextTrack = queue[currentIndex + 1];
    if (nextTrack) set({ currentTrack: nextTrack });
  },
  previousTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((track) => track.id === currentTrack?.id);
    const previousTrack = queue[currentIndex - 1];
    if (previousTrack) set({ currentTrack: previousTrack });
  },
}));