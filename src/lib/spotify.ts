import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Spotify Client ID
const REDIRECT_URI = window.location.origin;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
];

export const spotify = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);