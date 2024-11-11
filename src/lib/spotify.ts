import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = 'f690731e4fac4b8caeb4bbd58b1d9941'; // Replace with your Spotify Client ID
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
