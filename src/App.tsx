import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { spotify } from './lib/spotify';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Search = lazy(() => import('./pages/Search').then(module => ({ default: module.Search })));
const Library = lazy(() => import('./pages/Library').then(module => ({ default: module.Library })));

function App() {
  const { isAuthenticated, isLoading, error } = useSpotifyAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <p className="text-red-400 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 p-0.5 animate-glow mx-auto mb-6">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                G
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 text-transparent bg-clip-text animate-gradient mb-8">
            Welcome to Groov
          </h1>
          <button
            onClick={() => spotify.authenticate()}
            className="w-full px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-colors font-medium"
          >
            Connect with Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-auto pb-28">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </Suspense>
          </main>
          <Player />
        </div>
      </ErrorBoundary>
    </Router>
  );
}